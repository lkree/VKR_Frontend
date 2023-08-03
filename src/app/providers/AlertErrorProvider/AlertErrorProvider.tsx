import type { FC, PropsWithChildren } from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '~/shared/lib/hooks';
import { selectErrorsMessagesList, actions } from '~/shared/models/commonStores';

export const AlertErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const errorsMessagesList = useSelector(selectErrorsMessagesList);
  const { cleanErrors, addAlertsSettings } = useActions(actions);

  useLayoutEffect(() => {
    if (errorsMessagesList.length) {
      errorsMessagesList.forEach(message => addAlertsSettings({ children: message, variant: 'danger' }));
      cleanErrors();
    }
  }, [errorsMessagesList]);

  return <>{children}</>;
};
