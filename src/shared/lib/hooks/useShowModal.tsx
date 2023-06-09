import { ReactNode, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { useWindowEvent } from '~/shared/lib/hooks/useWindowEvent';

interface ButtonProps {
  onClick?: () => void;
  title: string;
}

interface Props {
  acceptProps: ButtonProps;
  declineProps: ButtonProps;
  title?: ReactNode;
  body: ReactNode;
}

export const useShowModal = ({ acceptProps, declineProps, title, body }: Props) => {
  const [show, setShow] = useState(false);

  const handleDecline = () => {
    declineProps.onClick?.();
    setShow(false);
  };

  const handleAccept = () => {
    acceptProps.onClick?.();
    setShow(false);
  };

  useWindowEvent('keyup', e => {
    if (show) {
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
      show: () => setShow(true),
      Modal: () => (
        <>
          <Modal show={show} onHide={handleDecline} backdrop="static" keyboard={false}>
            {title && (
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
            )}
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleAccept}>
                {acceptProps.title}
              </Button>
              <Button variant="secondary" onClick={handleDecline}>
                {declineProps.title}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ),
    }),
    [show]
  );
};
