import type { FC, ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

interface Props {
  header: ReactNode;
  body: ReactNode;
}

export const Layout: FC<Props> = ({ header, body }) => (
  <Container fluid className="d-flex flex-column min-vh-100 min-vw-100 bg-dark text-white p-3 gap-3">
    <Row>
      <Col>{header}</Col>
    </Row>

    <Row className="flex-grow-1">
      <Col>{body}</Col>
    </Row>
  </Container>
);
