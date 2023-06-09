import { memo } from 'react';
import { Accordion } from 'react-bootstrap';

import { CitiesPrefixEdit } from '~/entities/CitiesPrefixEdit';
import { FileUpload } from '~/entities/FileUpload';
import { MinimalLeftoversAndOrderingEdit } from '~/entities/MinimalLeftoversAndOrderingEdit';
import { UserLayout } from '~/entities/UserLayout';

const BODY_RENDER_MAP = [
  { header: 'Настройка парсинга городов', bodyRender: () => <CitiesPrefixEdit /> },
  { header: 'Обновить остатки', bodyRender: () => <FileUpload /> },
  {
    header: 'Редактировать количество заказываемого товара и минимальные остатки',
    bodyRender: () => <MinimalLeftoversEdit />,
  },
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
