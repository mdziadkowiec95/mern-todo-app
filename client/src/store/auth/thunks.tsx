import { Action } from 'redux';
import { AppState } from '../../store/rootReducer';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { RegisterUserPayload } from './types';
import {
  registerUserBegin,
  registerUserSuccess,
  registerUserError
} from './actions';

import { notifyUser } from '../notifications/thunks';
import { ErrorMessage } from '../types';

export const registerUser = (
  userData: RegisterUserPayload,
  onSuccess: Function,
  onError: Function
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  try {
    dispatch(registerUserBegin());
    const res = await axios.post('/api/users', userData);

    dispatch(registerUserSuccess(res.data.token));
  } catch (error) {
    const errors: ErrorMessage[] = error.response.data.errors;

    errors.forEach((err: ErrorMessage) => {
      console.log(err.msg);

      dispatch(notifyUser(err.msg, 'error'));
    });

    dispatch(registerUserError());
    onError();
  }
};
