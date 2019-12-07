import { combineReducers } from 'redux'
import auth from './auth/reducers'
import { notificationsReducer } from './notifications/reducers'
import { tasksReducer } from './tasks/reducers'
import { uiReducer } from './ui/reducers'
import { preferencesReducer } from './preferences/reducers'

const rootReducer = combineReducers({
  auth,
  notifications: notificationsReducer,
  tasks: tasksReducer,
  ui: uiReducer,
  preferences: preferencesReducer,
})

export default rootReducer
