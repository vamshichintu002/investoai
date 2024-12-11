import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

interface FormContextType {
  hasFilledForm: boolean;
  isLoading: boolean;
  error: string | null;
  checkFormStatus: () => Promise<void>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Cache for form status
const formStatusCache = new Map<string, { status: boolean; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function FormProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [hasFilledForm, setHasFilledForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkFormStatus = async () => {
    if (!isSignedIn || !user) {
      setHasFilledForm(false);
      setError(null);
      return;
    }

    const clerkId = user.id;
    const cachedData = formStatusCache.get(clerkId);
    const now = Date.now();

    // Return cached value if it's still valid
    if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
      setHasFilledForm(cachedData.status);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      const response = await fetch(`/.netlify/functions/api/check-form-status/${clerkId}`, {
        signal: controller.signal
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check form status');
      }

      const data = await response.json();
      
      // Update cache
      formStatusCache.set(clerkId, {
        status: data.hasFilledForm,
        timestamp: now
      });
      
      setHasFilledForm(data.hasFilledForm);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Error checking form status:', error);
        setError(error.message);
        setHasFilledForm(false);
      }
    } finally {
      setIsLoading(false);
    }

    return () => controller.abort();
  };

  useEffect(() => {
    checkFormStatus();
  }, [isSignedIn, user?.id]);

  const value = {
    hasFilledForm,
    isLoading,
    error,
    checkFormStatus
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
