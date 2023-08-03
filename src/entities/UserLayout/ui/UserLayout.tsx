import type { FC, ReactNode } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import cn from 'classnames';

import { Navigation } from '~/entities/Navigation';
import { UserInfo } from '~/entities/UserInfo';

import { InternalRoutes } from '~/shared/const';
import { selectUser } from '~/shared/models/commonStores';
import { Layout } from '~/shared/ui/Layout';

interface Props {
  body: ReactNode;
  showNavigation?: boolean;
}

export const UserLayout: FC<Props> = ({ body, showNavigation = true }) => {
  const user = useSelector(selectUser);

  if (!user) return <Navigate to={InternalRoutes.Login} />;

  return (
    <Layout
      header={
        <Row className={cn({ 'justify-content-end': !showNavigation })}>
          {showNavigation && (
            <Col>
              <Navigation />
            </Col>
          )}
          <Col xs="auto" className="d-flex">
            <UserInfo email={user.email} />
          </Col>
        </Row>
      }
      body={body}
    />
  );
};
