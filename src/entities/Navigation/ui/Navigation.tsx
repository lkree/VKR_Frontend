import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import cn from 'classnames';

import { InternalRoutes } from '~/shared/const';

import css from './Navigation.module.sass';

const ITEMS = [
  {
    to: InternalRoutes.Main,
    text: 'Main',
  },
  {
    to: InternalRoutes.Admin,
    text: 'Admin',
  },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <Nav className={css.wrapper} variant="tabs" activeKey={location.pathname}>
      {ITEMS.map(({ to, text }) => (
        <Nav.Item className={css.item} key={to}>
          <Link className={cn(css.link, { [css.linkActive!]: to === location.pathname })} to={to}>
            {text}
          </Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};
