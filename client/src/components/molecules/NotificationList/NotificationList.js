import React from 'react'
import PropTypes from 'prop-types'
import Notification from '../../atoms/Notification/Notification'
import styles from './NotificationList.module.scss'

const NotificationList = ({ items }) => (
  <ul className={styles.wrapper}>
    {items.length > 0 &&
      items.map(item => (
        <li key={item.id} className={styles.item}>
          <Notification {...item} />
        </li>
      ))}
  </ul>
)

NotificationList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default NotificationList
