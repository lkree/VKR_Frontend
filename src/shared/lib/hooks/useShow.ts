import { useEffect, useState } from 'react';

import { useIsMounted } from '~/shared/lib/hooks';

export const useShow = (showTime: number, ...dependencies: unknown[]) => {
  const [show, setShow] = useState(false);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) return;

    setShow(true);

    const id = setTimeout(() => {
      setShow(false);
    }, showTime);

    return () => id && clearTimeout(id);
  }, dependencies);

  return show;
};
