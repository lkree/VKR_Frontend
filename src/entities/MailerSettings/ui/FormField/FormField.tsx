import { memo } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useActions } from '~/shared/lib/hooks';

import { actions, selectLocalMailerSettings } from '../../model';
import type { MailSettings } from '../../types';

interface Props {
  title: string;
  placeholder?: string;
  colClassName?: string;
  field: keyof MailSettings;
  type: 'text' | 'number' | 'checkbox' | 'password' | 'email';
}

export const FormField = memo(({ field, type, title, placeholder, colClassName }: Props) => {
  const value = useSelector(selectLocalMailerSettings)[field];
  const { setLocalMailSettings } = useActions(actions);
  const isCheckbox = type === 'checkbox';
  const Input = isCheckbox ? Form.Check : Form.Control;

  return (
    <Form.Group as={Row} className="mb-3" controlId={`input${field}`}>
      <Form.Label column sm={2}>
        {title}
      </Form.Label>

      <Col sm={10} className={colClassName}>
        <Input
          type={type as 'checkbox'}
          placeholder={placeholder}
          onChange={e =>
            setLocalMailSettings({
              [field]: isCheckbox
                ? (e.target as HTMLInputElement).checked
                : type === 'number'
                ? +e.target.value
                : e.target.value,
            })
          }
          {...{ [isCheckbox ? 'checked' : 'value']: value }}
        />
      </Col>
    </Form.Group>
  );
});
