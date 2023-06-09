import { useMemo, useState } from 'react';
import { Alert, AlertProps } from 'react-bootstrap';

import type { Queue } from '~/shared/lib/hooks/useQueue';
import type { Nullable } from '~/shared/lib/ts';

import { useUIQueue } from './useUIQueue';

export const useShowAlert = () => {
  const [alertState, setAlertState] = useState<Nullable<AlertProps>>(null);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const queue = useUIQueue(
    3000,
    () => setAlertState(queue.get()!),
    () => setAlertState(null)
  ) as Queue<AlertProps>;

  return useMemo(
    () => ({
      setAlertState: (props: AlertProps) => queue.push(props),
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
