import { Spinner } from 'react-bootstrap';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import { ProtectedRoute } from '@processes/Login';

const getIndexPage = () =>
  import('@pages/App').then(({ App }) => ({
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  }));

export const Router = () => (
  <RouterProvider
    fallbackElement={<Spinner />}
    router={createBrowserRouter([
      {
        path: '/',
        children: [
          { lazy: getIndexPage, index: true },
          { element: <div className="test123">123123</div>, path: '/asd' },
        ],
        element: <Outlet />,
      },
      {
        path: '/auth',
        lazy: () => import('@pages/Login').then(({ Login }) => ({ element: <Login /> })),
      },
      {
        path: '*',
        lazy: getIndexPage,
      },
    ])}
  />
);
