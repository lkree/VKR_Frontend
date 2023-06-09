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
        element: <ProtectedRoute otherwiseRoute={InternalRoutes.Main} type="anonymous" />,
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
        element: <ProtectedRoute otherwiseRoute={InternalRoutes.Login} type="auth" />,
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
            element: <ProtectedRoute otherwiseRoute={InternalRoutes.Main} type="admin" />,
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
