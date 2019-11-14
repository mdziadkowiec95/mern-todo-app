import { combineReducers } from 'redux';
import auth from './auth/reducers';
import notifications from './notifications/reducers';

const rootReducer = combineReducers({
  auth,
  notifications,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
