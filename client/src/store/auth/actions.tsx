import { EAuthActionTypes, TAuthActionTypes } from './types';

export const registerUserBegin = (): TAuthActionTypes => ({
  type: EAuthActionTypes.REGISTER_USER_BEGIN
});

export const registerUserSuccess = (token: string): TAuthActionTypes => ({
  type: EAuthActionTypes.REGISTER_USER_SUCCESS,
  payload: {
    token
  }
});

export const registerUserError = (): TAuthActionTypes => ({
  type: EAuthActionTypes.REGISTER_USER_ERROR
});
