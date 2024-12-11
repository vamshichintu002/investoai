import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { investmentDataService } from '../../features/services/investmentDataService';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

async function testAPI() {
  try {
    const response = await fetch(`${API_URL}/.netlify/functions/api/test`);
    if (!response.ok) {
      throw new Error('API test failed');
    }
    return await response.json();
  } catch (error) {
    console.error('API test failed:', error);
    throw error;
  }
}

async function syncUserToDatabase(clerkId: string, email: string) {
  try {
    console.log('=== Starting User Sync ===');
    console.log('Sync attempt with:', { clerkId, email });

    const response = await fetch(`${API_URL}/.netlify/functions/api/sync-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clerkId, email }),
    });

    console.log('Sync response status:', response.status);
    const data = await response.json();
    console.log('Sync response data:', data);

    if (!response.ok) {
      throw new Error(data.details || 'Failed to sync user');
    }

    return data;
  } catch (error) {
    console.error('Error in syncUserToDatabase:', error);
    throw error;
  }
}

function AuthSync() {
  const { userId, isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    async function checkAndSyncUser() {
      if (!isAuthLoaded || !isUserLoaded) {
        console.log('Still loading...', { isAuthLoaded, isUserLoaded });
        return;
      }

      if (!isSignedIn || !userId || !user) {
        console.log('User not signed in or data not available');
        investmentDataService.setUser('');
        return;
      }

      console.log('Initializing investment data service for user:', userId);
      investmentDataService.setUser(userId);

      const userEmail = user.emailAddresses.find(e => e.verification?.status === 'verified')?.emailAddress
        || user.primaryEmailAddress?.emailAddress
        || user.emailAddresses[0]?.emailAddress;

      if (!userEmail) {
        console.error('No valid email found for user');
        setError('Please verify your email address to continue.');
        return;
      }

      try {
        setError(null);
        setIsRetrying(false);
        
        console.log('Starting user sync process:', {
          userId,
          email: userEmail,
          timestamp: new Date().toISOString()
        });

        const result = await syncUserToDatabase(userId, userEmail);
        
        if (result.success) {
          console.log('Sync successful:', result);
          setIsNewUser(!result.exists);
        } else {
          throw new Error('Sync failed: ' + (result.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error in checkAndSyncUser:', error);
        setError(error.message || 'Failed to sync user data');
      }
    }

    checkAndSyncUser();
  }, [isAuthLoaded, isUserLoaded, isSignedIn, userId, user, isRetrying]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-dark bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-dark-card rounded-2xl shadow-xl p-6 md:p-8 border border-dark-border max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => setIsRetrying(true)}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isNewUser) {
    return (
      <div className="fixed inset-0 bg-dark bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-dark-card rounded-2xl shadow-xl p-6 md:p-8 border border-dark-border max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome!</h2>
          <p className="text-gray-300 mb-6">
            Please complete the investment profile questionnaire to get started.
          </p>
          <button
            onClick={() => setIsNewUser(false)}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all"
          >
            Continue to Questionnaire
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error('Missing Clerk Publishable Key');
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AuthSync />
      {children}
    </ClerkProvider>
  );
}
