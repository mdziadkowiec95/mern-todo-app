import React from 'react';
import Notification from '../../atoms/Notification/Notification';
import { INotification } from '../../../models/notifications';
import styles from './NotificationList.module.scss';

interface NotificationListProps {
  items: INotification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ items }) => (
  <ul className={styles.wrapper}>
    {items.length > 0 &&
      items.map((item: INotification) => (
        <li key={item.id} className={styles.item}>
          <Notification {...item} />
        </li>
      ))}
  </ul>
);

export default NotificationList;
