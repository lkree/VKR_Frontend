import { useCallback, useLayoutEffect, useRef } from 'react';

export const useEvent = <T extends (...props: any[]) => any>(fn: T) => {
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  return useCallback((...args: any[]) => fnRef.current.apply(null, args), [fnRef]) as T;
};
