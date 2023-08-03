import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import type { Noop } from 'lkree-common-utils/ts';
import { preventDefault } from 'lkree-react-utils';

import { useActions } from '~/shared/lib/hooks';

import { actions, selectEmailPassword } from '../model';

import css from './Login.module.sass';

export const Login = () => {
  const { email, password } = useSelector(selectEmailPassword);
  const { submit, setEmail, setPassword } = useActions(actions);

  return (
    <Container fluid className="justify-content-center align-items-center vh-100 vw-100 d-flex bg-dark text-white">
      <Form className={css.wrapper} onSubmit={preventDefault}>
        <Form.Group as={Row} controlId="formPlaintextEmail" className="mb-3 justify-content-center">
          <Col xs="4">
            <Form.Label column>Email</Form.Label>
          </Col>

          <Col>
            <Form.Control
              type="text"
              value={email}
              placeholder="email@email.ru"
              onChange={e => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword" className="mb-3 justify-content-center">
          <Col xs="4">
            <Form.Label column>Пароль</Form.Label>
          </Col>

          <Col>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Col>
        </Form.Group>

        <Row>
          <Col>
            <Button type="submit" variant="primary" onClick={submit as Noop}>
              Авторизоваться
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
