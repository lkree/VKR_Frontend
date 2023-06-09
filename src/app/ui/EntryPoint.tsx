import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { compose } from '~/shared/lib/helpers';
import { useActions } from '~/shared/lib/hooks';
import { actions, selectIsSessionChecked } from '~/shared/models/session';
import { LoadingPage } from '~/shared/ui/LoadingPage';

import { Router, withStore } from '../providers';

const App = () => {
  const hasSession = useSelector(selectIsSessionChecked);
  const { loadSession } = useActions(actions);

  useLayoutEffect(() => {
    if (!hasSession) void loadSession();
  }, []);

  if (!hasSession) return <LoadingPage />;

  return <Router />;
};

export const EntryPoint = compose(withStore)(() => <App />);
