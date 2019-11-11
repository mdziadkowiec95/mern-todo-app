import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import NotificationList from '../../components/molecules/NotificationList/NotificationList';
import { INotification } from '../../types/notifications';

type NotificaitonListContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class NotificaitonListContainer extends Component<
  NotificaitonListContainerProps
> {
  render() {
    // const arr = [
    //   { id: '1', msg: 'test msg 1' },
    //   { id: '2', type: 'success', msg: 'test msg 2' },
    //   { id: '3', type: 'success', msg: 'test msg 3' }
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
  notifications: state.notifications
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificaitonListContainer);
