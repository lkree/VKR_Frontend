import type { FC } from 'react';
import { Form, Row } from 'react-bootstrap';

import { UserCreation } from '~/entities/ResponsiblePersonsEdit/ui/UserCreation/UserCreation';

import type { ResponsiblePerson, ResponsiblePersonWithPassword } from '../../types';
import { NotificationEdit } from '../NotificationEdit';

import css from './FormField.module.sass';

interface Props {
  person: ResponsiblePerson;
  onTestEmail: (email: string) => void;
  onSave: (responsiblePerson: ResponsiblePersonWithPassword) => void;
}

export const FormField: FC<Props> = ({ person, onSave, onTestEmail }) => (
  <div className="d-flex flex-column gap-2">
    <Form.Group as={Row} key={person.cityName}>
      <Form.Label column sm={12}>
        <strong>{person.cityName}</strong>
      </Form.Label>
    </Form.Group>

    <NotificationEdit person={person} onSave={onSave} onTestEmail={onTestEmail} className={css.notifyField} />

    <UserCreation person={person} onSave={onSave} className={css.notifyField} />
  </div>
);
