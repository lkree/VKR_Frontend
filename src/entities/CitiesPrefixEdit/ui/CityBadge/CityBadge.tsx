import type { FC } from 'react';
import { CloseButton, Badge } from 'react-bootstrap';
import type { BadgeProps } from 'react-bootstrap/Badge';

import cn from 'classnames';

import type { CitiesPrefixes } from '../../api';

import css from './CityBadge.module.sass';

interface Props {
  cityName: string;
  cityPrefix: string;
  bg?: BadgeProps['bg'];
  onClose?: ([cityName, cityPrefix]: CitiesPrefixes[number]) => void;
}

export const CityBadge: FC<Props> = ({ cityPrefix, cityName, onClose, bg = 'primary' }) => (
  <Badge bg={bg} className="p-4 position-relative">
    <div className="h6 m-0">{`${cityPrefix.toUpperCase()} => ${cityName}`}</div>

    {onClose && (
      <CloseButton
        className={cn(css.closeButton, 'position-absolute')}
        variant="white"
        onClick={() => onClose([cityName, cityPrefix])}
      />
    )}
  </Badge>
);
