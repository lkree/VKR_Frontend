import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import cn from 'classnames';

import { InternalRoutes } from '~/shared/const';

import css from './Navigation.module.sass';

const ITEMS = [
  {
    to: InternalRoutes.Main,
    text: 'Главная',
  },
  {
    to: InternalRoutes.Admin,
    text: 'Панель администратора',
  },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <Nav variant="tabs" className={css.wrapper} activeKey={location.pathname}>
      {ITEMS.map(({ to, text }) => (
        <Nav.Item key={to} className={css.item}>
          <Link to={to} className={cn(css.link, { [css.linkActive!]: to === location.pathname })}>
            {text}
          </Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};
