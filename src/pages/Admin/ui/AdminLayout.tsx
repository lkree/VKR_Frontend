import { memo } from 'react';
import { Accordion } from 'react-bootstrap';

import { CitiesPrefixEdit } from '~/entities/CitiesPrefixEdit';
import { FileUpload } from '~/entities/FileUpload';
import { MailerSettings } from '~/entities/MailerSettings';
import { MinimalLeftoversAndOrderingEdit } from '~/entities/MinimalLeftoversAndOrderingEdit';
import { ResponsiblePersonsEdit } from '~/entities/ResponsiblePersonsEdit';
import { UserLayout } from '~/entities/UserLayout';

const BODY_RENDER_MAP = [
  { header: 'Настройка парсинга городов', bodyRender: () => <CitiesPrefixEdit /> },
  { header: 'Обновить остатки', bodyRender: () => <FileUpload /> },
  {
    header: 'Редактировать количество заказываемого товара и минимальные остатки',
    bodyRender: () => <MinimalLeftoversAndOrderingEdit />,
  },
  { header: 'Редактировать информацию об ответственных за города', bodyRender: () => <ResponsiblePersonsEdit /> },
  { header: 'Редактировать настройки отправки почты', bodyRender: () => <MailerSettings /> },
];

export const AdminLayout = memo(() => (
  <UserLayout
    body={
      <Accordion>
        {BODY_RENDER_MAP.map(({ header, bodyRender }, index) => (
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>{header}</Accordion.Header>
            <Accordion.Body>{bodyRender()}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    }
  />
));
