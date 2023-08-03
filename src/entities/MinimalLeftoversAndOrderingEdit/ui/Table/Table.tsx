import { Fragment, useCallback } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { createPromise } from 'lkree-common-utils/helpers';

import { useActions } from '~/shared/lib/hooks';
import { actions as commonActions } from '~/shared/models/commonStores';
import { EditableField } from '~/shared/ui/EditableField';

import { computeModalProps } from '../../lib/helpers';
import { actions, selectMinimalLeftoversList } from '../../model';
import type { MinimalLeftovers, Product } from '../../types';

export const Table = () => {
  const minimalLeftoversArray = useSelector(selectMinimalLeftoversList);

  const { writeMinimalLeftover } = useActions(actions);
  const { addAlertsSettings, addModalSettings } = useActions(commonActions);

  const onAcceptLeftoverChange = useCallback(
    (product: Product, minimalLeftovers: MinimalLeftovers) =>
      writeMinimalLeftover({
        cityName: minimalLeftovers.cityName,
        products: minimalLeftovers.products.map(p => (p.nomenclature === product.nomenclature ? product : p)),
      })
        .unwrap()
        .then(() => addAlertsSettings({ variant: 'success', children: 'Изменения сохранены' })),
    []
  );

  const onDeleteProduct = useCallback((product: Product, minimalLeftovers: MinimalLeftovers) => {
    const { promise, reject } = createPromise();

    addModalSettings(
      computeModalProps({
        onAccept: () => {
          void writeMinimalLeftover({
            cityName: minimalLeftovers.cityName,
            products: minimalLeftovers.products.filter(p => p.nomenclature !== product.nomenclature),
          })
            .unwrap()
            .then(() => addAlertsSettings({ variant: 'success', children: 'Запись удалена' }))
            .catch(reject);
        },
      })
    );

    return promise;
  }, []);

  if (!minimalLeftoversArray) return null;

  return (
    <BootstrapTable hover bordered size="sm" className="leftoverTable">
      <thead>
        <tr>
          <th>Город</th>
          <th>Товар</th>
          <th>Минимальный Остаток</th>
          <th>Количество товара для заказа</th>
        </tr>
      </thead>
      <tbody>
        {minimalLeftoversArray.map(minimalLeftovers => (
          <Fragment key={minimalLeftovers.cityName}>
            <tr>
              <td colSpan={4} className="align-middle">
                <strong>{minimalLeftovers.cityName}</strong>
              </td>
            </tr>
            {minimalLeftovers.products.map(product => (
              <tr key={product.nomenclature}>
                <td></td>
                <td className="align-middle">
                  <div className="">{product.nomenclature}</div>
                </td>
                <td className="align-middle w-25">
                  <EditableField
                    value={product.minimalLeftover}
                    onDelete={() => onDeleteProduct(product, minimalLeftovers)}
                    onAccept={payload =>
                      onAcceptLeftoverChange({ ...product, minimalLeftover: payload }, minimalLeftovers)
                    }
                  />
                </td>
                <td className="align-middle w-25">
                  <EditableField
                    value={product.orderingCount}
                    onDelete={() => onDeleteProduct(product, minimalLeftovers)}
                    onAccept={payload =>
                      onAcceptLeftoverChange({ ...product, orderingCount: payload }, minimalLeftovers)
                    }
                  />
                </td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </BootstrapTable>
  );
};
