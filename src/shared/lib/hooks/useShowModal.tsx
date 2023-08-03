import { ReactNode, useMemo } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { useQueue, useWindowEvent } from 'lkree-react-utils';

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

export interface ModalState {
  body: ReactNode;
  title?: ReactNode;
  acceptProps: ButtonProps;
  declineProps: ButtonProps;
}

export const useShowModal = () => {
  const queue = useQueue<ModalState>();
  const modalState = queue.get();

  const handleDecline = () => {
    modalState?.declineProps.onClick?.();
    queue.shift();
  };

  const handleAccept = () => {
    modalState?.acceptProps.onClick?.();
    queue.shift();
  };

  useWindowEvent('keyup', e => {
    if (modalState) {
      switch (e.code) {
        case 'Enter':
          return handleAccept();
        case 'Escape':
          return handleDecline();
      }
    }
  });

  return useMemo(
    () => ({
      setModalState: (modalState: ModalState) => queue.push(modalState),
      Modal: () =>
        modalState ? (
          <Modal show keyboard={false} backdrop="static" onHide={handleDecline}>
            {modalState.title && (
              <Modal.Header closeButton>
                <Modal.Title>{modalState.title}</Modal.Title>
              </Modal.Header>
            )}
            <Modal.Body>{modalState.body}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleAccept}>
                {modalState.acceptProps.title}
              </Button>
              <Button variant="secondary" onClick={handleDecline}>
                {modalState.declineProps.title}
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null,
    }),
    [modalState]
  );
};
