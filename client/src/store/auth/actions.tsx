import { EAuthActionTypes, TAuthActionTypes } from './types';
import { IUser } from '../../models/user';

// Register User (SignUp) --- POST /api/users
export const registerUserBegin = (): TAuthActionTypes => ({
  type: EAuthActionTypes.REGISTER_USER_BEGIN,
});
export const registerUserSuccess = (token: string): TAuthActionTypes => ({
  type: EAuthActionTypes.REGISTER_USER_SUCCESS,
  payload: {
    authToken: token,
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

// Login User (SignIn) --- POST /api/auth
export const loginUserBegin = (): TAuthActionTypes => ({
  type: EAuthActionTypes.LOGIN_USER_BEGIN,
});
export const loginUserSuccess = (token: string): TAuthActionTypes => ({
  type: EAuthActionTypes.LOGIN_USER_SUCCESS,
  payload: {
    authToken: token,
  },
});
export const loginUserError = (): TAuthActionTypes => ({
  type: EAuthActionTypes.LOGIN_USER_ERROR,
});

// Logout User
export const logoutUser = (): TAuthActionTypes => ({
  type: EAuthActionTypes.LOGOUT_USER,
});
