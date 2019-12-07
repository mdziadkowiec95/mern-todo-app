import { AuthActionTypes } from './types'

const initialState = {
  authToken: localStorage.getItem('token'),
  isAuth: null,
  isLoading: true,
  user: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case AuthActionTypes.AUTHENTICATE_USER_BEGIN:
    case AuthActionTypes.REGISTER_USER_BEGIN:
    case AuthActionTypes.LOGIN_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case AuthActionTypes.REGISTER_USER_SUCCESS:
    case AuthActionTypes.LOGIN_USER_SUCCESS:
      localStorage.setItem('token', payload.authToken)

      return { ...state, authToken: payload.authToken, isLoading: false }
    case AuthActionTypes.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuth: true,
        isLoading: false,
      }
    case AuthActionTypes.REGISTER_USER_ERROR:
    case AuthActionTypes.LOGIN_USER_ERROR:
    case AuthActionTypes.AUTHENTICATE_USER_ERROR:
    case AuthActionTypes.LOGOUT_USER:
      localStorage.removeItem('token')

      return {
        ...state,
        authToken: null,
        isAuth: null,
        user: null,
        isLoading: false,
      }
    default:
      return state
  }
}
