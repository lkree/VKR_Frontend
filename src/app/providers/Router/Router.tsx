import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ProtectedRoute } from '~/processes/Login';

import { InternalRoutes } from '~/shared/const';
import { LoadingPage } from '~/shared/ui/LoadingPage';

const getLoginPage = () => import('~/pages/Login').then(({ Login }) => ({ element: <Login /> }));
const getIndexPage = () => import('~/pages/App').then(({ App }) => ({ element: <App /> }));

export const Router = () => (
  <RouterProvider
    fallbackElement={<LoadingPage />}
    router={createBrowserRouter([
      {
        element: <ProtectedRoute type="anonymous" otherwiseRoute={InternalRoutes.Main} />,
        children: [
          {
            path: InternalRoutes.Login,
            lazy: getLoginPage,
          },
          {
            path: '*',
            lazy: getLoginPage,
          },
        ],
      },
      {
        element: <ProtectedRoute type="auth" otherwiseRoute={InternalRoutes.Login} />,
        children: [
          {
            path: InternalRoutes.Main,
            lazy: getIndexPage,
          },
          {
            path: InternalRoutes.Logout,
            lazy: () => import('~/pages/Logout').then(({ Logout }) => ({ element: <Logout /> })),
          },
          {
            path: '*',
            lazy: getIndexPage,
          },
          {
            element: <ProtectedRoute type="admin" otherwiseRoute={InternalRoutes.Main} />,
            children: [
              {
                path: InternalRoutes.Admin,
                lazy: () => import('~/pages/Admin').then(({ Admin }) => ({ element: <Admin /> })),
              },
            ],
          },
        ],
      },
    ])}
  />
);
