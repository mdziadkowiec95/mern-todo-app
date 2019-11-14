import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import NotificationList from '../../components/molecules/NotificationList/NotificationList';
import { INotification } from '../../models/notifications';

type NotificaitonListContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class NotificaitonListContainer extends Component<NotificaitonListContainerProps> {
  render() {
    // const arr = [
    //   { id: '1', type: 'success', msg: 'Passwords must be the same' },
    //   { id: '2', type: 'warning2', msg: 'Passwords must be the same' },
    //   { id: '3', type: 'error', msg: 'tPasswords must be the same test' },
    // ];

    const notifications: INotification[] = this.props.notifications;

    if (notifications.length === 0) return null;

    return (
      <div>
        <NotificationList items={notifications} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificaitonListContainer);
