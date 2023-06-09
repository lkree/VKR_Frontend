import type { FC } from 'react';
import { memo } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import cn from 'classnames';

import { InternalRoutes } from '~/shared/const';

import css from './UserInfo.module.sass';

interface Props {
  email: string;
}

const getInitials = (email: string) => email.slice(0, 4).toUpperCase();

export const UserInfo: FC<Props> = memo(({ email }) => {
  const navigate = useNavigate();

  return (
    // <Dropdown >
    //   <Dropdown.Toggle className="text-truncate">{getInitials(email)}</Dropdown.Toggle>
    //
    //   <Dropdown.Menu variant="dark" show>
    //     <Dropdown.Item href="#/action-1" active>
    //       Action
    //     </Dropdown.Item>
    //     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    //     <Dropdown.Divider />
    //     <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>

    <NavDropdown
      className={cn(css.wrapper, 'border-white d-flex justify-content-center align-items-center')}
      title={<div className="text-white text-truncate">{getInitials(email)}</div>}
      menuVariant="dark"
    >
      <NavDropdown.Item onClick={() => navigate(InternalRoutes.Logout)}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
});
