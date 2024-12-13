import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import FormApp from './Form/App';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import DashboardPage from './pages/dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/form',
    element: (
      <>
        <SignedIn>
          <FormApp />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    ),
  },
  {
    path: '/investment-dashboard',
    element: (
      <>
        <SignedIn>
          <DashboardPage />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    ),
  },
]);
