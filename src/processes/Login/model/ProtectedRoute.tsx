import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsLoggedIn } from '@pages/Login';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) return <Navigate to="/auth" replace />;

  return <>{children}</>;
};
