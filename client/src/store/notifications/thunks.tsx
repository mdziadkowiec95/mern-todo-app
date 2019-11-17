import { Action, Dispatch } from 'redux';
import uuid from 'uuid';
import { addNotification, removeNotification } from './actions';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../rootReducer';
import { logoutUser } from '../auth/actions';

export const notifyUser = (
  msg: string,
  type: string,
  duration: number = 3000
): ThunkAction<void, AppState, null, Action<string>> => (dispatch: Dispatch) => {
  const id = uuid.v4();

  dispatch(addNotification(id, type, msg));

  setTimeout(() => dispatch(removeNotification(id)), duration);

  dispatch(logoutUser());
};
