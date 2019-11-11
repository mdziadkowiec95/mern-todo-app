import { EAuthActionTypes, TAuthActionTypes } from './types';

export interface IUserLabel {
  name: string;
  color: string;
}

export interface IUserProject {
  name: string;
  color: string;
}

export interface IUser {
  email: string;
  name: string;
  password: string;
  avatar: string;
  labels: IUserLabel[];
  projects: IUserProject[];
  preferences: {
    themeColor?: string;
    defaultView?: string;
    dailyGoal?: number;
    weeklyGoal?: number;
  };
}

export interface IReduxAuthState {
  token: string | null;
  isAuth: boolean | null;
  isLoading: boolean;
  user: IUser | null;
}

const initialState: IReduxAuthState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  isLoading: false,
  user: null
};

export default function(
  state: IReduxAuthState = initialState,
  action: TAuthActionTypes
) {
  switch (action.type) {
    case EAuthActionTypes.REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case EAuthActionTypes.REGISTER_USER_SUCCESS:
      return { ...state, authToken: action.payload.token, isLoading: false };
    case EAuthActionTypes.REGISTER_USER_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
