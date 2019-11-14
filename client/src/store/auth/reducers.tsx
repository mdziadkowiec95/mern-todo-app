import { EAuthActionTypes } from './types';
import { IUser } from '../../models/user';
import { AnyAction } from 'redux';

export interface IAuthState {
  token: string | null;
  isAuth: boolean | null;
  isLoading: boolean;
  user: IUser | null;
}

const initialState: IAuthState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  isLoading: true,
  user: null,
};

export default function(state: IAuthState = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case EAuthActionTypes.AUTHENTICATE_USER_BEGIN:
    case EAuthActionTypes.REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case EAuthActionTypes.REGISTER_USER_SUCCESS:
      localStorage.setItem('token', payload.token);

      return { ...state, authToken: payload.token, isLoading: false };
    case EAuthActionTypes.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuth: true,
        isLoading: false,
      };
    case EAuthActionTypes.REGISTER_USER_ERROR:
    case EAuthActionTypes.AUTHENTICATE_USER_ERROR:
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        isAuth: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
