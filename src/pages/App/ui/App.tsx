import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { LeftoversTable } from '~/entities/LeftoversTable';
import { UserLayout } from '~/entities/UserLayout';

import { selectIsAdmin } from '~/shared/models/commonStores';

export function App() {
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <UserLayout
      showNavigation={isAdmin}
      body={
        <Container fluid className="bg-light p-4 rounded">
          <LeftoversTable />
        </Container>
      }
    />
  );
}
