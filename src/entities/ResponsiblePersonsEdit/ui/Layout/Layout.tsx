import type { FC } from 'react';
import { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useInitDownloadData } from 'lkree-react-utils';

import { useActions } from '~/shared/lib/hooks';
import { actions as commonActions } from '~/shared/models/commonStores';

import { selectResponsiblePersonArray, actions } from '../../model';
import type { ResponsiblePerson } from '../../types';
import { FormField } from '../FormField';

export const Layout: FC = () => {
  const responsiblePersonArray = useSelector(selectResponsiblePersonArray);
  const { downloadResponsiblePersonsArray, uploadResponsiblePerson, sendTestEmail } = useActions(actions);
  const { addAlertsSettings } = useActions(commonActions);

  useInitDownloadData({ data: responsiblePersonArray, downloadFn: downloadResponsiblePersonsArray });

  const onSaveClick = useCallback((responsiblePerson: ResponsiblePerson) => {
    void uploadResponsiblePerson(responsiblePerson)
      .unwrap()
      .then(() => addAlertsSettings({ variant: 'success', children: 'Запись успешна сохранена' }));
  }, []);

  const onTestEmailClick = useCallback((email: string) => {
    void sendTestEmail(email)
      .unwrap()
      .then(() => addAlertsSettings({ variant: 'success', children: 'Сообщение отправлено' }));
  }, []);

  if (!responsiblePersonArray) return null;

  return (
    <Form className="d-flex flex-column gap-3">
      {responsiblePersonArray.map(person => (
        <FormField person={person} onSave={onSaveClick} key={person.cityName} onTestEmail={onTestEmailClick} />
      ))}
    </Form>
  );
};
