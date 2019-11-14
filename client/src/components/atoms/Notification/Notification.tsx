import React from 'react';
import styles from './Notification.module.scss';
import { INotification } from '../../../models/notifications';
import cn from 'classnames';
interface INotificationProps extends INotification {}

const Notification: React.FC<INotificationProps> = ({ id, type, msg }) => {
  const wrapperClass = cn(styles.wrapper, {
    [styles.success]: type === 'success',
    [styles.warning]: type === 'warning',
    [styles.error]: type === 'error',
  });

  return (
    <div id={id} className={wrapperClass}>
      {msg}
    </div>
  );
};

export default Notification;
