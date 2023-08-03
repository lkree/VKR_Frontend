import { noop } from 'lkree-common-utils/helpers';

export const computeModalProps = ({ onAccept = noop, onDecline = noop } = {}) => ({
  title: 'Подтвердите действие',
  body: 'Вы точно хотите удалить эту запись?',
  acceptProps: {
    title: 'Удалить',
    onClick: onAccept,
  },
  declineProps: {
    title: 'Отмена',
    onClick: onDecline,
  },
});
