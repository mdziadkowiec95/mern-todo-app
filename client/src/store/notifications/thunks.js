import uuid from 'uuid'
import { addNotification, removeNotification } from './actions'

export const notifyUser = (msg, type, duration = 5000) => dispatch => {
  const id = uuid.v4()

  dispatch(addNotification(id, type, msg))

  setTimeout(() => dispatch(removeNotification(id)), duration)
}
