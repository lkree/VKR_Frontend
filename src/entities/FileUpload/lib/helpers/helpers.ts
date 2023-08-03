import { noop } from 'lkree-common-utils/helpers';

export const computeDeleteModalProps = ({ onAccept = noop, onDecline = noop } = {}) => ({
  title: 'Подтвердите действие',
  body: 'Вы точно хотите удалить все остатки?',
  acceptProps: {
    title: 'Удалить',
    onClick: onAccept,
  },
  declineProps: {
    title: 'Отмена',
    onClick: onDecline,
  },
});

export const computeResponsibleNotifyModalProps = ({ onAccept = noop, onDecline = noop } = {}) => ({
  title: 'Подтвердите действие',
  body: 'Уведомить ответственных о необходимости дозаказа?',
  acceptProps: {
    title: 'Уведомить',
    onClick: onAccept,
  },
  declineProps: {
    title: 'Не уведомлять',
    onClick: onDecline,
  },
});
