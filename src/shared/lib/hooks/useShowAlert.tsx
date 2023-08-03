import { useMemo, useState } from 'react';
import { Alert, AlertProps } from 'react-bootstrap';

import type { Nullable } from 'lkree-common-utils/ts';
import { useTimeoutQueue, Queue } from 'lkree-react-utils';

export type AlertState = AlertProps;

export const useShowAlert = () => {
  const [alertState, setAlertState] = useState<Nullable<AlertState>>(null);
  const queue: Queue<AlertState> = useTimeoutQueue(
    3000,
    () => setAlertState(queue.get()!),
    () => setAlertState(null)
  );

  return useMemo(
    () => ({
      setAlertState: (props: AlertState) => queue.push(props),
      Alert: () => (
        <>
          {Boolean(alertState) && (
            <Alert {...alertState} show style={{ position: 'absolute', top: 0, width: '100%', left: 0 }} />
          )}
        </>
      ),
    }),
    [alertState]
  );
};
