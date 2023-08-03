import type { FC } from 'react';
import { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

import { checkEmailValidity } from 'lkree-common-utils/helpers';

import type { ResponsiblePerson, ResponsiblePersonWithPassword } from '../../types';

interface Props {
  className?: string;
  person: ResponsiblePerson;
  onSave: (responsiblePerson: ResponsiblePersonWithPassword) => void;
}

export const UserCreation: FC<Props> = ({ person, onSave, className }) => {
  const [accountEmail, setAccountEmail] = useState(person.accountEmail);
  const [accountPassword, setAccountPassword] = useState('');
  const isEmailValid = checkEmailValidity(accountEmail);

  return (
    <Form.Group as={Row} className={className}>
      <Form.Label column sm={2} controlId="inputEmail">
        Данные для входа:
      </Form.Label>

      <Col sm={4}>
        <Form.Control
          type="email"
          placeholder="email"
          value={accountEmail}
          onChange={e => setAccountEmail(e.target.value)}
        />
      </Col>

      <Col sm={4}>
        <Form.Control
          type="password"
          placeholder="password"
          value={accountPassword}
          onChange={e => setAccountPassword(e.target.value)}
        />
      </Col>

      <Col>
        <Button
          disabled={!accountEmail || !isEmailValid || !accountPassword}
          onClick={() => {
            onSave({ ...person, accountEmail, password: accountPassword });
            setAccountPassword('');
          }}
        >
          Сохранить
        </Button>
      </Col>
    </Form.Group>
  );
};
