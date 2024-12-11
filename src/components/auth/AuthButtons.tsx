import React from 'react';
import { useAuth, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export function AuthButtons({ onClose }: { onClose?: () => void }) {
  const { isSignedIn } = useAuth();
  const { openSignIn, openSignUp } = useClerk();
  const navigate = useNavigate();

  const handleSignIn = () => {
    onClose?.();
    openSignIn({
      redirectUrl: '/form',
    });
  };

  const handleSignUp = () => {
    onClose?.();
    openSignUp({
      redirectUrl: '/form',
    });
  };

  if (isSignedIn) {
    return (
      <button
        onClick={() => navigate('/form')}
        className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 w-full sm:w-auto"
      >
        Go to Form
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