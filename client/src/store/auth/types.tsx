import { IUser } from '../../models/user';

export enum EAuthActionTypes {
  REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
  AUTHENTICATE_USER_BEGIN = 'AUTHENTICATE_USER_BEGIN',
  AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS',
  AUTHENTICATE_USER_ERROR = 'AUTHENTICATE_USER_ERROR',
}

// Register user
interface IRegisterUserBeginAction {
  type: EAuthActionTypes.REGISTER_USER_BEGIN;
}

interface IRegisterUserSuccessAction {
  type: EAuthActionTypes.REGISTER_USER_SUCCESS;
  payload: {
    token: string;
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

// All Auth module actions
export type TAuthActionTypes =
  | IRegisterUserBeginAction
  | IRegisterUserSuccessAction
  | IRegisterUserErrorAction
  | IAuthenticateUserBegin
  | IAuthenticateUserSuccess
  | IAuthenticateUserError;

// Request data interfaces
export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
