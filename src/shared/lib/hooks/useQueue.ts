import { useMemo, useState } from 'react';

import type { Voidable } from '~/shared/lib/ts';

export interface Queue<T> {
  get: () => Voidable<T>;
  shift: () => void;
  push: (item: T) => void;
  length: () => number;
  isEmpty: () => boolean;
}

export const useQueue = <T>(): Queue<T> => {
  const [queue, setQueue] = useState<T[]>([]);

  return useMemo(
    () => ({
      get: () => queue[0],
      shift: () =>
        setQueue(queue => {
          queue.shift();

          return [...queue];
        }),
      push: (item: T) => setQueue(queue => [...queue, item]),
      length: () => queue.length,
      isEmpty: () => !queue.length,
    }),
    [queue]
  );
};
