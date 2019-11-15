import { IUser } from '../../models/user';

export enum EAuthActionTypes {
  REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
  AUTHENTICATE_USER_BEGIN = 'AUTHENTICATE_USER_BEGIN',
  AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS',
  AUTHENTICATE_USER_ERROR = 'AUTHENTICATE_USER_ERROR',
  LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
  LOGOUT_USER = 'LOGOUT_USER',
}

// Register user (SignUp)
interface IRegisterUserBeginAction {
  type: EAuthActionTypes.REGISTER_USER_BEGIN;
}

interface IRegisterUserSuccessAction {
  type: EAuthActionTypes.REGISTER_USER_SUCCESS;
  payload: {
    authToken: string;
  };
}
interface IRegisterUserErrorAction {
  type: EAuthActionTypes.REGISTER_USER_ERROR;
}

// Authenticate User
interface IAuthenticateUserBegin {
  type: EAuthActionTypes.AUTHENTICATE_USER_BEGIN;
}

interface IAuthenticateUserSuccess {
  type: EAuthActionTypes.AUTHENTICATE_USER_SUCCESS;
  payload: IUser;
}

interface IAuthenticateUserError {
  type: EAuthActionTypes.AUTHENTICATE_USER_ERROR;
}

// Login User (SignIn)
interface ILoginUserBegin {
  type: EAuthActionTypes.LOGIN_USER_BEGIN;
}

interface ILoginUserSuccess {
  type: EAuthActionTypes.LOGIN_USER_SUCCESS;
  payload: {
    authToken: string;
  };
}

interface ILoginUserError {
  type: EAuthActionTypes.LOGIN_USER_ERROR;
}

// Logout User
interface ILogoutUser {
  type: EAuthActionTypes.LOGOUT_USER;
}

// All Auth module actions
export type TAuthActionTypes =
  | IRegisterUserBeginAction
  | IRegisterUserSuccessAction
  | IRegisterUserErrorAction
  | IAuthenticateUserBegin
  | IAuthenticateUserSuccess
  | IAuthenticateUserError
  | ILoginUserBegin
  | ILoginUserSuccess
  | ILoginUserError
  | ILogoutUser;

// Request data interfaces
export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}
