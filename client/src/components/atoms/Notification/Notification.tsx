import React from 'react';
import styles from './Notification.module.scss';
import { INotification } from '../../../types/notifications';

interface NotificationProps extends INotification {}

const Notification: React.FC<NotificationProps> = ({ id, type, msg }) => {
  return <div className={styles.wrapper}>{msg}</div>;
};

export default Notification;
