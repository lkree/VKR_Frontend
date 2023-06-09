import { useLayoutEffect, useRef } from 'react';

import { noop } from 'lodash';

import { useLatest } from '~/shared/lib/hooks/useLatest';
import type { fn } from '~/shared/lib/ts';

import { Queue, useQueue } from './useQueue';

export const useUIQueue = <T>(updateTime: number, onEffect: fn = noop, onTimeout: fn = noop): Queue<T> => {
  const onEffectRef = useLatest(onEffect);
  const onTimeoutRef = useLatest(onTimeout);
  const isShowing = useRef(false);
  const queue = useQueue<T>();

  useLayoutEffect(() => {
    if (isShowing.current || queue.isEmpty()) return;

    onEffectRef.current();

    isShowing.current = true;

    setTimeout(() => {
      onTimeoutRef.current();
      queue.shift();

      isShowing.current = false;
    }, updateTime);
  }, [queue]);

  return queue;
};
