import React from 'react';
import { useAuth, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../contexts/FormContext';

export function AuthButtons({ onClose }: { onClose?: () => void }) {
  const { isSignedIn } = useAuth();
  const { openSignIn, openSignUp } = useClerk();
  const navigate = useNavigate();
  const { hasFilledForm, isLoading, error } = useForm();

  const handleSignIn = async () => {
    onClose?.();
    try {
      const result = await openSignIn();
      if (result?.createdUserId) {
        const response = await fetch(`/.netlify/functions/api/check-user-status/${result.createdUserId}`);
        if (!response.ok) {
          throw new Error('Failed to check user status');
        }
        const data = await response.json();
        if (data.redirectTo) {
          navigate(data.redirectTo);
        }
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const handleSignUp = () => {
    onClose?.();
    openSignUp({
      redirectUrl: '/form',
    });
  };

  const handleFormClick = () => {
    onClose?.();
    if (hasFilledForm) {
      navigate('/investment-dashboard');
    } else {
      navigate('/form');
    }
  };

  if (isSignedIn) {
    return (
      <button
        onClick={handleFormClick}
        disabled={isLoading}
        className={`
          bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-2 rounded-full 
          hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 
          w-full sm:w-auto relative
          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
          ${error ? 'bg-red-500 hover:bg-red-600' : ''}
        `}
        title={error || undefined}
      >
        {isLoading ? (
          'Loading...'
        ) : error ? (
          'Error Loading Status'
        ) : (
          hasFilledForm ? 'Go to Dashboard' : 'Go to Form'
        )}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleSignIn}
        className="px-4 py-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 w-full sm:w-auto"
      >
        Login
      </button>
      <button
        onClick={handleSignUp}
        className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 w-full sm:w-auto"
      >
        Sign Up
      </button>
    </>
  );
}