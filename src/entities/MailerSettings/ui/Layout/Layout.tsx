import { FormEvent, memo, useCallback } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectLocalMailerSettings, selectReceivedMailerSettings } from '~/entities/MailerSettings/model';

import { useActions, useInitDownloadData } from '~/shared/lib/hooks';

import { actions } from '../model';
import type { MailSettings } from '../types';

interface Props {
  field: keyof MailSettings;
  title: string;
  type: 'text' | 'number' | 'checkbox' | 'password';
  placeholder?: string;
  colClassName?: string;
}

const FormField = memo(({ field, type, title, placeholder, colClassName }: Props) => {
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

const FIELDS_MAP = [
  { field: 'user', type: 'text', title: 'Пользователь', placeholder: 'example@mail.ru' },
  { field: 'password', type: 'password', title: 'Пароль', placeholder: 'пароль от почты' },
  { field: 'host', type: 'text', title: 'Хост', placeholder: 'smtp.mail.ru' },
  { field: 'port', type: 'number', title: 'Порт', placeholder: '465' },
  { field: 'secure', type: 'checkbox', title: 'Защищенный', colClassName: 'd-flex align-items-center' },
] as const;

export const Layout = () => {
  const receivedMailerSettings = useSelector(selectReceivedMailerSettings);
  const { downloadMailSettings, uploadMailSettings } = useActions(actions);

  useInitDownloadData({ data: receivedMailerSettings, downloadFn: downloadMailSettings });

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    void uploadMailSettings();
  }, []);

  if (!receivedMailerSettings) return null;

  return (
    <Form onSubmit={onSubmit}>
      {FIELDS_MAP.map((props, i) => (
        <FormField key={i} {...props} />
      ))}

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 0 }}>
          <Button type="submit">Сохранить</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};
