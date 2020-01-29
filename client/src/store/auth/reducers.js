import { AuthActionTypes } from './types'

const initialState = {
  authToken: localStorage.getItem('token'),
  isAuth: null,
  isLoading: false,
  user: null,
  verification: {
    isVerified: false,
    tokenExpired: false
  }
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case AuthActionTypes.AUTHENTICATE_USER_BEGIN:
    case AuthActionTypes.REGISTER_USER_BEGIN:
    case AuthActionTypes.LOGIN_USER_BEGIN:
    case AuthActionTypes.CONFIRM_EMAIL_BEGIN:
    case AuthActionTypes.RESEND_CONFIRM_EMAIL_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
      case AuthActionTypes.REGISTER_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
        }
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
      case AuthActionTypes.CONFIRM_EMAIL_SUCCESS:
        return {
          ...state,
          isLoading: false,
          verification: {
            isVerified: true,
            tokenExpired: false,
          }
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
      case AuthActionTypes.CONFIRM_EMAIL_ERROR:
        return {
          ...state,
          isLoading: false,
          verification: {
            isVerified: false,
            tokenExpired: payload.tokenExpired,
          }
        }
    default:
      return state
  }
}
