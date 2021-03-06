import { combineReducers } from 'redux'
import auth from './auth/reducers'
import { notificationsReducer } from './notifications/reducers'
import { tasksReducer } from './tasks/reducers'
import { uiReducer } from './ui/reducers'
import { preferencesReducer } from './preferences/reducers'
import { projectsReducer } from './projects/reducers'
import { searchReducer } from './search/reducers'

const rootReducer = combineReducers({
  auth,
  notifications: notificationsReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
  ui: uiReducer,
  preferences: preferencesReducer,
  search: searchReducer,
})

export default rootReducer
