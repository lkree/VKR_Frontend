import type { FC, PropsWithChildren } from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions, useShowAlert } from '~/shared/lib/hooks';
import { selectErrorsMessagesList, actions } from '~/shared/models/commonStores';

export const WithErrorAlert: FC<PropsWithChildren> = ({ children }) => {
  const errorsMessagesList = useSelector(selectErrorsMessagesList);
  const { cleanErrors } = useActions(actions);
  const { Alert, setAlertState } = useShowAlert();

  useLayoutEffect(() => {
    if (errorsMessagesList.length) {
      errorsMessagesList.forEach(message => setAlertState({ children: message, variant: 'danger' }));
      cleanErrors();
    }
  }, [errorsMessagesList]);

  return (
    <>
      {children}
      <Alert />
    </>
  );
};
