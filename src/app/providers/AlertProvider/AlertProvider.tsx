import type { FC, PropsWithChildren } from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions, useShowAlert } from '~/shared/lib/hooks';
import { actions, selectAlertsSettingsList } from '~/shared/models/commonStores';

export const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const alertsSettings = useSelector(selectAlertsSettingsList);
  const { cleanAlertsSettings } = useActions(actions);
  const { Alert, setAlertState } = useShowAlert();

  useLayoutEffect(() => {
    if (alertsSettings.length) {
      alertsSettings.forEach(settings => setAlertState(settings));
      cleanAlertsSettings();
    }
  }, [alertsSettings]);

  return (
    <>
      {children}
      <Alert />
    </>
  );
};
