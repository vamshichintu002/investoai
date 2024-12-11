import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export function useAfterSignIn() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!isSignedIn || !user) return;

      try {
        const response = await fetch(`/.netlify/functions/api/check-user-status/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to check user status');
        }
        
        const data = await response.json();
        if (data.redirectTo) {
          navigate(data.redirectTo);
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkUserStatus();
  }, [isSignedIn, user, navigate]);
}
