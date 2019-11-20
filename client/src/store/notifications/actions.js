import { types } from './types'

/**
 * @param {String} id Notification ID
 * @param {String} type Notification type
 * @param {String} msg Notification message
 */
export const addNotification = (id, type, msg) => ({
  type: types.ADD_NOTIFICATION,
  payload: {
    id,
    type,
    msg,
  },
})

/**
 * @param {String} id Notification ID
 */
export const removeNotification = id => ({
  type: types.REMOVE_NOTIFICATION,
  payload: {
    id,
  },
})
