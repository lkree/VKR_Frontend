import { Fragment } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { noop } from 'lodash';

import { useActions, useInitDownloadData, useShowAlert } from '~/shared/lib/hooks';
import { EditableField } from '~/shared/ui/EditableField';

import { selectLeftoversList, actions } from '../model';

export const Layout = () => {
  const { Alert, setAlertState } = useShowAlert();
  const leftoversList = useSelector(selectLeftoversList);
  const { getLeftoversList } = useActions(actions);

  useInitDownloadData({ data: leftoversList, downloadFn: getLeftoversList });

  if (!leftoversList) return null;

  return (
    <>
      <BootstrapTable bordered hover size="sm" className="leftoverTable">
        <thead>
          <tr>
            <th>Город</th>
            <th>Товар</th>
            <th>Остаток</th>
            <th>В пути</th>
            <th>Количество товара для заказа</th>
          </tr>
        </thead>
        <tbody>
          {leftoversList.map(leftover => (
            <Fragment key={leftover.cityName}>
              <tr>
                <td className="align-middle" colSpan={5}>
                  <strong>{leftover.cityName}</strong>
                </td>
              </tr>
              {leftover.leftovers.map((product, i) => (
                <tr key={product.vendorCode ?? i}>
                  <td></td>
                  <td className="align-middle">
                    <div className="">{product.nomenclature}</div>
                  </td>
                  <td className="align-middle w-25">
                    <div className="">{product.leftoverAtEnd}</div>
                  </td>
                  <td className="align-middle w-25">
                    <EditableField value={product.ordered} onAccept={noop} onDelete={noop} />
                  </td>
                  <td className="align-middle">
                    <div className="">{product.haveToOrder}</div>
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </BootstrapTable>
      <Alert />
    </>
  );
};
