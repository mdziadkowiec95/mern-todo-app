import { NotificationsActionTypes } from './types'

export const addNotification = (id, type, msg) => ({
  type: NotificationsActionTypes.ADD_NOTIFICATION,
  payload: {
    id,
    type,
    msg,
  },
})

export const removeNotification = id => ({
  type: NotificationsActionTypes.REMOVE_NOTIFICATION,
  payload: {
    id,
  },
})
