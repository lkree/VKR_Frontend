import { Col, Container, Form, Row, Button } from 'react-bootstrap';

import { useUnit } from 'effector-react';

import { $email, isSubmitting, emailChanged, passwordChanged, $password } from '../model';

export const Login = () => {
  const [email, password] = useUnit([$email, $password]);

  return (
    <Container fluid className="justify-content-center align-items-center vh-100 d-flex">
      <Form className="w-100" onSubmit={e => e.preventDefault()}>
        <Form.Group as={Row} className="mb-3 w-100 justify-content-center" controlId="formPlaintextEmail">
          <Form.Label column xl="1" sm="2" xs="3">
            Email
          </Form.Label>
          <Col xl="4" sm="5" xs="9">
            <Form.Control type="text" value={email} onChange={e => emailChanged(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 w-100 justify-content-center" controlId="formPlaintextPassword">
          <Form.Label column xl="1" sm="2" xs="3">
            Password
          </Form.Label>
          <Col xl="4" sm="5" xs="9">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => passwordChanged(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={() => isSubmitting()}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};
