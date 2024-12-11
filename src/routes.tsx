import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from './Form/App';
import { Dashboard } from './Dashboard';
import DashboardPage from './pages/dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard/:userId',
    element: <Dashboard />,
  },
  {
    path: '/investment-dashboard',
    element: <DashboardPage />,
  },
]);
