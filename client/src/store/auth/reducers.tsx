import { EAuthActionTypes } from './types';
import { IUser } from '../../models/user';
import { AnyAction } from 'redux';

export interface IAuthState {
  authToken: string | null;
  isAuth: boolean | null;
  isLoading: boolean;
  user: IUser | null;
}

const initialState: IAuthState = {
  authToken: localStorage.getItem('token'),
  isAuth: null,
  isLoading: true,
  user: null,
};

export default function(state: IAuthState = initialState, action: AnyAction): IAuthState {
  const { type, payload } = action;

  switch (type) {
    case EAuthActionTypes.AUTHENTICATE_USER_BEGIN:
    case EAuthActionTypes.REGISTER_USER_BEGIN:
    case EAuthActionTypes.LOGIN_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EAuthActionTypes.REGISTER_USER_SUCCESS:
    case EAuthActionTypes.LOGIN_USER_SUCCESS:
      localStorage.setItem('token', payload.authToken);

      return { ...state, authToken: payload.authToken, isLoading: false };
    case EAuthActionTypes.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuth: true,
        isLoading: false,
      };
    case EAuthActionTypes.REGISTER_USER_ERROR:
    case EAuthActionTypes.LOGIN_USER_ERROR:
    case EAuthActionTypes.AUTHENTICATE_USER_ERROR:
    case EAuthActionTypes.LOGOUT_USER:
      localStorage.removeItem('token');

      return {
        ...state,
        authToken: null,
        isAuth: null,
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
