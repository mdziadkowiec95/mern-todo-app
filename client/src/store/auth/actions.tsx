import { EAuthActionTypes, TAuthActionTypes } from './types';
import { IUser } from '../../models/user';

// User registration --- POST /api/users
export const registerUserBegin = (): TAuthActionTypes => ({
  type: EAuthActionTypes.REGISTER_USER_BEGIN,
});
export const registerUserSuccess = (token: string): TAuthActionTypes => ({
  type: EAuthActionTypes.REGISTER_USER_SUCCESS,
  payload: {
    token,
  },
});
export const registerUserError = (): TAuthActionTypes => ({
  type: EAuthActionTypes.REGISTER_USER_ERROR,
});

// User authenticaton --- GET /api/auth
export const authenticateUserBegin = (): TAuthActionTypes => ({
  type: EAuthActionTypes.AUTHENTICATE_USER_BEGIN,
});
export const authenticateUserSuccess = (user: IUser): TAuthActionTypes => ({
  type: EAuthActionTypes.AUTHENTICATE_USER_SUCCESS,
  payload: user,
});
export const authenticateUserError = (): TAuthActionTypes => ({
  type: EAuthActionTypes.AUTHENTICATE_USER_ERROR,
});
