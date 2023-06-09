import type { FC } from 'react';

import * as icons from './icons';

interface Props {
  type: keyof typeof import('./icons');
  className?: string;
}

export const Icon: FC<Props> = ({ type, className }) => {
  const IconSvg = icons[type];

  return <IconSvg className={className} />;
};
