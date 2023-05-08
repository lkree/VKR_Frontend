import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsLoggedIn } from '@pages/Login';

export const Login = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) return <Navigate to="/" replace />;

  return (
    <Container fluid className="justify-content-center align-items-center vh-100 d-flex">
      <Form className="w-100">
        <Form.Group as={Row} className="mb-3 w-100 justify-content-center" controlId="formPlaintextEmail">
          <Form.Label column xl="1" sm="2" xs="3">
            Email
          </Form.Label>
          <Col xl="4" sm="5" xs="9">
            <Form.Control type="text" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 w-100 justify-content-center" controlId="formPlaintextPassword">
          <Form.Label column xl="1" sm="2" xs="3">
            Password
          </Form.Label>
          <Col xl="4" sm="5" xs="9">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};
