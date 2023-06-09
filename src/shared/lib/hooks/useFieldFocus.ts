import type { RefObject } from 'react';
import { useLayoutEffect } from 'react';

export const useFieldFocus = (elementRef: RefObject<HTMLInputElement>, show: boolean) => {
  useLayoutEffect(() => {
    if (show) elementRef.current?.focus();
  }, [show]);
};
