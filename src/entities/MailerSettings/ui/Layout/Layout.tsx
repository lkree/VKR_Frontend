import { FormEvent, useCallback } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useInitDownloadData } from 'lkree-react-utils';

import { useActions } from '~/shared/lib/hooks';
import { actions as commonActions } from '~/shared/models/commonStores';

import { selectIsAllDataReady, selectIsUploading, selectReceivedMailerSettings, actions } from '../../model';
import { FormField } from '../FormField';

const FIELDS_MAP = [
  { field: 'user', type: 'email', title: 'Пользователь', placeholder: 'example@mail.ru' },
  { field: 'password', type: 'password', title: 'Пароль', placeholder: 'пароль от почты' },
  { field: 'host', type: 'text', title: 'Хост', placeholder: 'smtp.mail.ru' },
  { field: 'port', type: 'number', title: 'Порт', placeholder: '465' },
  { field: 'secure', type: 'checkbox', title: 'Защищенный', colClassName: 'd-flex align-items-center' },
] as const;

export const Layout = () => {
  const receivedMailerSettings = useSelector(selectReceivedMailerSettings);
  const isAllDataReady = useSelector(selectIsAllDataReady);
  const isUploading = useSelector(selectIsUploading);
  const { downloadMailSettings, uploadMailSettings } = useActions(actions);
  const { addAlertsSettings } = useActions(commonActions);

  useInitDownloadData({ data: receivedMailerSettings, downloadFn: downloadMailSettings });

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    void uploadMailSettings()
      .unwrap()
      .then(() => addAlertsSettings({ variant: 'success', children: 'Данные сохранены' }));
  }, []);

  if (!receivedMailerSettings) return null;

  return (
    <Form onSubmit={onSubmit}>
      {FIELDS_MAP.map((props, i) => (
        <FormField key={i} {...props} />
      ))}

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 0 }}>
          <Button type="submit" disabled={isUploading || !isAllDataReady}>
            Сохранить
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};
