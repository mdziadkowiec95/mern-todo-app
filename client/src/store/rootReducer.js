import { combineReducers } from 'redux'
import auth from './auth/reducers'
import { notificationsReducer } from './notifications/reducers'
import { tasksReducer } from './tasks/reducers'
import { uiReducer } from './ui/reducers'

const rootReducer = combineReducers({
  auth,
  notifications: notificationsReducer,
  tasks: tasksReducer,
  ui: uiReducer,
})

export default rootReducer
