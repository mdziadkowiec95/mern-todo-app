import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NotificationList from '../../components/molecules/NotificationList/NotificationList'

class NotificationListContainer extends Component {
  render() {
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
  ).isRequired,
}

NotificationListContainer.defaultProps = {
  notifications: [],
}

const mapStateToProps = state => ({
  notifications: state.notifications,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListContainer)
