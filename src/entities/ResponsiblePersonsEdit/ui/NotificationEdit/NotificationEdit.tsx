import type { FC } from 'react';
import { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

import { checkEmailValidity } from '~/shared/lib/helpers';

import type { ResponsiblePerson } from '../../types';

import css from './NotificationEdit.module.sass';

interface Props {
  person: ResponsiblePerson;
  onSave: (responsiblePerson: ResponsiblePerson) => void;
  onTestEmail: (email: string) => void;
}

export const NotificationEdit: FC<Props> = ({ person, onSave, onTestEmail }) => {
  const [notificationEmail, setNotificationEmail] = useState(person.notifyEmail);
  const isEmailValid = checkEmailValidity(notificationEmail);

  return (
    <Form.Group as={Row} className={css.notifyField}>
      <Form.Label column sm={2} controlId={`input${person.cityName}`}>
        Почта для связи:
      </Form.Label>

      <Col sm={4}>
        <Form.Control
          type="email"
          placeholder="test@email.ru"
          onChange={e => setNotificationEmail(e.target.value)}
          value={notificationEmail}
        />
      </Col>

      <Col sm={1}>
        <Button
          disabled={notificationEmail === person.notifyEmail || !notificationEmail || !isEmailValid}
          onClick={() => onSave({ ...person, notifyEmail: notificationEmail })}
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
