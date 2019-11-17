import { AuthActionTypes } from './types'

// Register User (SignUp) --- POST /api/users
export const registerUserBegin = () => ({
  type: AuthActionTypes.REGISTER_USER_BEGIN,
})

export const registerUserSuccess = token => ({
  type: AuthActionTypes.REGISTER_USER_SUCCESS,
  payload: {
    authToken: token,
  },
})
export const registerUserError = () => ({
  type: AuthActionTypes.REGISTER_USER_ERROR,
})

// User authenticaton --- GET /api/auth
export const authenticateUserBegin = () => ({
  type: AuthActionTypes.AUTHENTICATE_USER_BEGIN,
})
export const authenticateUserSuccess = user => ({
  type: AuthActionTypes.AUTHENTICATE_USER_SUCCESS,
  payload: user,
})
export const authenticateUserError = () => ({
  type: AuthActionTypes.AUTHENTICATE_USER_ERROR,
})

// Login User (SignIn) --- POST /api/auth
export const loginUserBegin = () => ({
  type: AuthActionTypes.LOGIN_USER_BEGIN,
})
export const loginUserSuccess = token => ({
  type: AuthActionTypes.LOGIN_USER_SUCCESS,
  payload: {
    authToken: token,
  },
})
export const loginUserError = () => ({
  type: AuthActionTypes.LOGIN_USER_ERROR,
})

// Logout User
export const logoutUser = () => ({
  type: AuthActionTypes.LOGOUT_USER,
})
