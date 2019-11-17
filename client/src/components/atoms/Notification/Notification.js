import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './Notification.module.scss'
import cn from 'classnames'
import { bindActionCreators } from 'redux'
import { removeNotification } from '../../../store/notifications/actions'

const Notification = ({ id, type, msg, removeNotification }) => {
  const wrapperClass = cn(styles.wrapper, {
    [styles.success]: type === 'success',
    [styles.warning]: type === 'warning',
    [styles.error]: type === 'error',
  })

  return (
    <button
      onClick={() => removeNotification(id)}
      id={id}
      className={wrapperClass}
      data-testid="notification-wrap"
    >
      {msg}
    </button>
  )
}

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
  msg: PropTypes.string.isRequired,
  removeNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeNotification,
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(Notification)
