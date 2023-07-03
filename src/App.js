import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignIn, Dashboard, Students } from './pages';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignIn />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/students',
      element: <Students />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
