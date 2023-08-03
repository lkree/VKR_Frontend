import { useLayoutEffect } from 'react';

import { useActions } from '~/shared/lib/hooks';

import { actions } from '../model';

export const Layout = () => {
  const { logout } = useActions(actions);

  useLayoutEffect(() => {
    void logout();
  }, []);

  return null;
};
