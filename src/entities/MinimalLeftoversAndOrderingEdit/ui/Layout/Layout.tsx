import { useLayoutEffect, Fragment, useCallback, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { noop } from 'lodash';

import { useActions, useShowAlert, useShowModal } from '~/shared/lib/hooks';

import { selectMinimalLeftoversArray, actions } from '../../model';
import type { MinimalLeftovers, Product } from '../../types';
import { EditableLeftover } from '../EditableLeftover';

import css from './Layout.module.sass';

export const Layout = () => {
  const { Alert, setAlertState } = useShowAlert();
  const minimalLeftoversArray = useSelector(selectMinimalLeftoversArray);

  const { getMinimalLeftoversArray, writeMinimalLeftover } = useActions(actions);
  const modalProps = useRef({
    title: 'Подтвердите действие',
    body: 'Вы точно хотите удалить эту запись?',
    acceptProps: {
      title: 'Удалить',
      onClick: noop,
    },
    declineProps: {
      title: 'Отмена',
      onClick: noop,
    },
  });
  const { show, Modal } = useShowModal(modalProps.current);

  const onAcceptLeftoverChange = useCallback((product: Product, minimalLeftovers: MinimalLeftovers) => {
    void writeMinimalLeftover({
      cityName: minimalLeftovers.cityName,
      products: minimalLeftovers.products.map(p => (p.name === product.name ? product : p)),
    });

    setAlertState({ variant: 'success', children: 'Изменения сохранены' });
  }, []);

  const onDeleteProduct = useCallback((product: Product, minimalLeftovers: MinimalLeftovers) => {
    modalProps.current.acceptProps.onClick = () => {
      void writeMinimalLeftover({
        cityName: minimalLeftovers.cityName,
        products: minimalLeftovers.products.filter(p => p.name !== product.name),
      });

      setAlertState({ variant: 'success', children: 'Запись удалена' });
    };
    show();
  }, []);

  useLayoutEffect(() => {
    if (!minimalLeftoversArray) void getMinimalLeftoversArray();
  }, []);

  if (!minimalLeftoversArray) return null;

  return (
    <>
      <Table bordered hover size="sm" className={css.wrapper}>
        <thead>
          <tr>
            <th>Город</th>
            <th>Товар</th>
            <th>Минимальный Остаток</th>
          </tr>
        </thead>
        <tbody>
          {minimalLeftoversArray.map(minimalLeftovers => (
            <Fragment key={minimalLeftovers.cityName}>
              <tr>
                <td className="align-middle" colSpan={3}>
                  {minimalLeftovers.cityName}
                </td>
              </tr>
              {minimalLeftovers.products.map(product => (
                <tr key={product.name}>
                  <td></td>
                  <td className="align-middle">
                    <div className="">{product.name}</div>
                  </td>
                  <td className="align-middle w-50">
                    <EditableLeftover
                      product={product}
                      onAccept={pr => onAcceptLeftoverChange(pr, minimalLeftovers)}
                      onDelete={pr => onDeleteProduct(pr, minimalLeftovers)}
                    />
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>

        <Alert />
        <Modal />
      </Table>
    </>
  );
};
