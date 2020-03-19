import axios from 'axios'
import * as AuthActions from './actions'
import { setAuthTokenHeader } from '../../utils/API'
import { handleErrorResponse } from '../../helpers'

export const authenticateUser = () => async dispatch => {
  const authToken = localStorage.getItem('token')

  if (!authToken) return

  setAuthTokenHeader(authToken)

  try {
    dispatch(AuthActions.authenticateUserBegin())

    const res = await axios.get('/api/auth')

    dispatch(AuthActions.authenticateUserSuccess(res.data))
  } catch (error) {
    dispatch(AuthActions.authenticateUserError())
  }
}

export const registerUser = (userData, onSuccess, onError) => async dispatch => {
  try {
    dispatch(AuthActions.registerUserBegin())

    const res = await axios.post('/api/users', userData)

    dispatch(AuthActions.registerUserSuccess(res.data.token))
    // dispatch(authenticateUser())
    onSuccess()
  } catch (error) {
    handleErrorResponse(error, dispatch)
    dispatch(AuthActions.registerUserError())
    onError()
  }
}

export const loginUser = (userData, onSuccess, onError) => async dispatch => {
  try {
    dispatch(AuthActions.loginUserBegin())

    const res = await axios.post('/api/auth', userData)

    dispatch(AuthActions.loginUserSuccess(res.data.token))
    dispatch(authenticateUser())
    onSuccess()
  } catch (error) {
    handleErrorResponse(error, dispatch)
    dispatch(AuthActions.loginUserError())
    onError()
  }
}

export const confirmEmail = token => async dispatch => {
  try {
    dispatch(AuthActions.confirmEmailBegin())

    const res = await axios.get(`/api/auth/confirmation?token=${token}`)

    if (res.data.userVerified) {
      dispatch(AuthActions.confirmEmailSuccess())
    }
  } catch (error) {
    const errors = error.response.data.errors
    const tokenExpired = errors && errors.length > 0 && errors[0].tokenExpired ? true : false

    handleErrorResponse(error, dispatch)
    dispatch(AuthActions.confirmEmailError(tokenExpired))
  }
}

export const resendConfirmEmail = userEmail => async dispatch => {
  try {
    dispatch(AuthActions.resendConfirmEmailBegin())

    const res = await axios.post(`/api/auth/confirmation/resend`, {
      email: userEmail,
    })

    if (res.data) {
      dispatch(AuthActions.resendConfirmEmailSuccess())
    }
  } catch (error) {
    handleErrorResponse(error, dispatch)
    dispatch(AuthActions.resendConfirmEmailError())
  }
}
