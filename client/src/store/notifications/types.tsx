export enum ENotificationsActionTypes {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
}
interface IAddNotificationAction {
  type: ENotificationsActionTypes.ADD_NOTIFICATION;
  payload: {
    id: string;
    type: string;
    msg: string;
  };
}

interface IRemoveNotificationAction {
  type: ENotificationsActionTypes.REMOVE_NOTIFICATION;
  payload: {
    id: string;
  };
}

export type TNotificationsActionTypes = IAddNotificationAction | IRemoveNotificationAction;
