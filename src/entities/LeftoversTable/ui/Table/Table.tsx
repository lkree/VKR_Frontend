import { Fragment, useCallback } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import cn from 'classnames';

import { useActions } from '~/shared/lib/hooks';
import { actions as commonActions } from '~/shared/models/commonStores';
import { EditableField } from '~/shared/ui/EditableField';

import { selectLeftoversList, actions } from '../../model';
import type { Leftover, LeftoverFilling } from '../../types';

import css from './Table.module.sass';

export const Table = () => {
  const leftoversList = useSelector(selectLeftoversList);
  const { updateLeftover } = useActions(actions);
  const { addAlertsSettings } = useActions(commonActions);

  const onAcceptOrderedChange = useCallback(
    (leftoverFilling: LeftoverFilling, leftover: Leftover) =>
      updateLeftover({
        cityName: leftover.cityName,
        leftovers: leftover.leftovers.map(l => (l.nomenclature === leftoverFilling.nomenclature ? leftoverFilling : l)),
      })
        .unwrap()
        .then(() => addAlertsSettings({ variant: 'success', children: 'Изменения сохранены' })),
    []
  );

  if (!leftoversList) return null;

  return (
    <BootstrapTable hover bordered size="sm" className="leftoverTable">
      <thead>
        <tr>
          <th>Город</th>
          <th>Товар</th>
          <th>Остаток</th>
          <th>В пути</th>
          <th>Необходимо дозаказать</th>
        </tr>
      </thead>
      <tbody>
        {leftoversList.map(leftoverFilling => (
          <Fragment key={leftoverFilling.cityName}>
            <tr>
              <td colSpan={5} className="align-middle">
                <strong>{leftoverFilling.cityName}</strong>
              </td>
            </tr>
            {leftoverFilling.leftovers.map((product, i) => (
              <tr key={product.vendorCode ?? i}>
                <td></td>
                <td className="align-middle">{product.nomenclature}</td>
                <td className="align-middle w-25">{product.leftoverAtEnd}</td>
                <td className="align-middle w-25">
                  <EditableField
                    value={product.orderedCount}
                    onAccept={payload => onAcceptOrderedChange({ ...product, orderedCount: payload }, leftoverFilling)}
                  />
                </td>
                <td className={cn({ [css.haveToOrder!]: product.haveToOrder !== 0 }, 'align-middle')}>
                  <div>{product.haveToOrder}</div>
                </td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </BootstrapTable>
  );
};
