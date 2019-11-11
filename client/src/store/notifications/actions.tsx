import { ENotificationsActionTypes, TNotificationsActionTypes } from './types';

export const addNotification = (
  id: string,
  type: string,
  msg: string
): TNotificationsActionTypes => ({
  type: ENotificationsActionTypes.ADD_NOTIFICATION,
  payload: {
    id,
    type,
    msg
  }
});

export const removeNotification = (id: string): TNotificationsActionTypes => ({
  type: ENotificationsActionTypes.REMOVE_NOTIFICATION,
  payload: {
    id
  }
});
