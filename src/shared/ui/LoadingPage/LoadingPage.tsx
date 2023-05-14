import { Container, Spinner } from 'react-bootstrap';

import css from './LoadingPage.module.sass';

export const LoadingPage = () => (
  <Container fluid className="vw-100 vh-100 d-flex justify-content-center align-items-center">
    <Spinner variant="info" className={css.wrapper} />
  </Container>
);
