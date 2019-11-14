import { Action, Dispatch, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { AppState } from '../../store/rootReducer';
import { RegisterUserPayload } from './types';
import {
  registerUserBegin,
  registerUserSuccess,
  registerUserError,
  authenticateUserBegin,
  authenticateUserSuccess,
  authenticateUserError,
} from './actions';
import { notifyUser } from '../notifications/thunks';
import { setAuthTokenHeader } from '../../utils/API';
import { IErrorMessage } from '../types';

export const authenticateUser = (): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch: Dispatch<AnyAction>
) => {
  const authToken: string | null = localStorage.getItem('token');

  if (authToken) {
    setAuthTokenHeader(authToken);
  }

  try {
    dispatch(authenticateUserBegin());

    const res = await axios.get('/api/auth');

    dispatch(authenticateUserSuccess(res.data));
  } catch (err) {
    dispatch(authenticateUserError());
  }
};

export const registerUser = (
  userData: RegisterUserPayload,
  onSuccess: Function,
  onError: Function
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  try {
    dispatch(registerUserBegin());

    const res = await axios.post('/api/users', userData);

    dispatch(registerUserSuccess(res.data.token));
    dispatch(authenticateUser());
    onSuccess();
  } catch (error) {
    const errors: IErrorMessage[] = error.response.data.errors;

    errors.forEach((err: IErrorMessage) => {
      dispatch(notifyUser(err.msg, 'error'));
    });

    dispatch(registerUserError());
    onError();
  }
};
