import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NotificationList from '../../components/molecules/NotificationList/NotificationList'

class NotificationListContainer extends Component {
  render() {
    // const arr = [
    //   { id: '1', type: 'success', msg: 'Passwords must be the same' },
    //   { id: '2', type: 'warning2', msg: 'Passwords must be the same' },
    //   { id: '3', type: 'error', msg: 'tPasswords must be the same test' },
    // ];

    const notifications = this.props.notifications

    if (notifications.length === 0) return null

    return (
      <div>
        <NotificationList items={notifications} />
      </div>
    )
  }
}

NotificationListContainer.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      msg: PropTypes.string,
    }),
  ),
}

NotificationListContainer.defaultProps = {
  notifications: [],
}

const mapStateToProps = state => ({
  notifications: state.notifications,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListContainer)
