import { combineReducers } from 'redux'
import auth from './auth/reducers'
import { notificationsReducer } from './notifications/reducers'
import { tasksReducer } from './tasks/reducers'

const rootReducer = combineReducers({
  auth,
  notifications: notificationsReducer,
  tasks: tasksReducer,
})

export default rootReducer
