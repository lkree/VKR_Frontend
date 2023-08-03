import type { FC, PropsWithChildren } from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { useActions, useShowModal } from '~/shared/lib/hooks';
import { actions, selectModalSettingsList } from '~/shared/models/commonStores';

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const modalSettings = useSelector(selectModalSettingsList);
  const { cleanModalSettings } = useActions(actions);
  const { Modal, setModalState } = useShowModal();

  useLayoutEffect(() => {
    if (modalSettings.length) {
      modalSettings.forEach(settings => setModalState(settings));
      cleanModalSettings();
    }
  }, [modalSettings]);

  return (
    <>
      {children}
      <Modal />
    </>
  );
};
