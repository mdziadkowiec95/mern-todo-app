import { combineReducers } from 'redux'
import auth from './auth/reducers'
import { notificationsReducer } from './notifications/reducers'

const rootReducer = combineReducers({
  auth,
  notifications: notificationsReducer,
})

export default rootReducer
