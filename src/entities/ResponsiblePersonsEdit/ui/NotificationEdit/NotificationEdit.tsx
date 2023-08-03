import type { FC } from 'react';
import { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

import { checkEmailValidity } from 'lkree-common-utils/helpers';

import type { ResponsiblePerson } from '../../types';

interface Props {
  className?: string;
  person: ResponsiblePerson;
  onTestEmail: (email: string) => void;
  onSave: (responsiblePerson: ResponsiblePerson) => void;
}

export const NotificationEdit: FC<Props> = ({ person, onSave, onTestEmail, className }) => {
  const [notificationEmail, setNotificationEmail] = useState(person.notifyEmail);
  const isEmailValid = checkEmailValidity(notificationEmail);

  return (
    <Form.Group as={Row} className={className}>
      <Form.Label column sm={2} controlId={`input${person.cityName}`}>
        Почта для оповещений:
      </Form.Label>

      <Col sm={4}>
        <Form.Control
          type="email"
          value={notificationEmail}
          placeholder="test@email.ru"
          onChange={e => setNotificationEmail(e.target.value)}
        />
      </Col>

      <Col sm="auto">
        <Button
          onClick={() => onSave({ ...person, notifyEmail: notificationEmail })}
          disabled={notificationEmail === person.notifyEmail || !notificationEmail || !isEmailValid}
        >
          Сохранить
        </Button>
      </Col>

      <Col>
        <Button variant="success" disabled={!isEmailValid} onClick={() => onTestEmail(notificationEmail)}>
          Выслать тестовое письмо
        </Button>
      </Col>
    </Form.Group>
  );
};
