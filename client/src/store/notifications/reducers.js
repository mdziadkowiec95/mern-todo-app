import { NotificationsActionTypes } from './types'
import { AuthActionTypes } from '../auth/types'

export const initialState = []

export const notificationsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case AuthActionTypes.LOGOUT_USER:
      return initialState // This is just as test for future reducers
    case NotificationsActionTypes.ADD_NOTIFICATION:
      return [...state, payload]
    case NotificationsActionTypes.REMOVE_NOTIFICATION:
      return state.filter(item => item.id !== payload.id)
    default:
      return state
  }
}
