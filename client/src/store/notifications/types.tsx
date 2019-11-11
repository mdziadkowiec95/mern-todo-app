export enum ENotificationsActionTypes {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'
}

interface IBaseNotificationActions {
  type: ENotificationsActionTypes;
}

interface IAddNotificationAction extends IBaseNotificationActions {
  type: ENotificationsActionTypes.ADD_NOTIFICATION;
  payload: {
    id: string;
    type: string;
    msg: string;
  };
}

interface IRemoveNotificationAction extends IBaseNotificationActions {
  type: ENotificationsActionTypes.REMOVE_NOTIFICATION;
  payload: {
    id: string;
  };
}

export type TNotificationsActionTypes =
  | IAddNotificationAction
  | IRemoveNotificationAction;
