export enum EAuthActionTypes {
  REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR'
}

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

export type TAuthActionTypes =
  | IRegisterUserBeginAction
  | IRegisterUserSuccessAction
  | IRegisterUserErrorAction;

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
