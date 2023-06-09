import type { FC } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useActions, useInitDownloadData } from '~/shared/lib/hooks';

import { selectResponsiblePersonArray, actions } from '../model';

export const Layout: FC = () => {
  const responsiblePersonArray = useSelector(selectResponsiblePersonArray);
  const { downloadResponsiblePersonsArray, setResponsiblePerson } = useActions(actions);

  useInitDownloadData({ data: responsiblePersonArray, downloadFn: downloadResponsiblePersonsArray });

  if (!responsiblePersonArray) return null;

  return (
    <Form>
      {responsiblePersonArray.map(person => (
        <Form.Group key={person.cityName} as={Row} className="mb-3" controlId={`input${person.cityName}`}>
          <Form.Label column sm={2}>
            {person.cityName}
          </Form.Label>

          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="test@email.ru"
              onChange={e => setResponsiblePerson({ cityName: person.cityName, email: e.target.value })}
              value={value}
            />
          </Col>
        </Form.Group>
      ))}
    </Form>
  );
};
