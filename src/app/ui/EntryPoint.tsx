import { useSelector } from 'react-redux';

import { useInitDownloadData } from 'lkree-react-utils';

import { useActions } from '~/shared/lib/hooks';
import { actions, selectIsSessionChecked } from '~/shared/models/session';
import { LoadingPage } from '~/shared/ui/LoadingPage';

import { AlertErrorProvider } from '../providers/AlertErrorProvider';
import { AlertProvider } from '../providers/AlertProvider';
import { ModalProvider } from '../providers/ModalProvider';
import { Router } from '../providers/Router';
import { StoreProvider } from '../providers/StoreProvider';

const App = () => {
  const hasSession = useSelector(selectIsSessionChecked);
  const { loadSession } = useActions(actions);

  useInitDownloadData({ data: hasSession, downloadFn: loadSession });

  if (!hasSession) return <LoadingPage />;

  return <Router />;
};

export const EntryPoint = () => (
  <StoreProvider>
    <ModalProvider>
      <AlertProvider>
        <AlertErrorProvider>
          <App />
        </AlertErrorProvider>
      </AlertProvider>
    </ModalProvider>
  </StoreProvider>
);
