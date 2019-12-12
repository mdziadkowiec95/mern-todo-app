import axios from 'axios'
import {
  registerUserBegin,
  registerUserSuccess,
  registerUserError,
  authenticateUserBegin,
  authenticateUserSuccess,
  authenticateUserError,
  loginUserBegin,
  loginUserSuccess,
  loginUserError,
} from './actions'
import { setAuthTokenHeader } from '../../utils/API'
import { handleErrorResponse } from '../../helpers'

export const authenticateUser = () => async dispatch => {
  const authToken = localStorage.getItem('token')

  if (authToken) {
    setAuthTokenHeader(authToken)
  }

  try {
    dispatch(authenticateUserBegin())

    const res = await axios.get('/api/auth')

    dispatch(authenticateUserSuccess(res.data))
  } catch (error) {
    dispatch(authenticateUserError())
  }
}

export const registerUser = (userData, onSuccess, onError) => async dispatch => {
  try {
    dispatch(registerUserBegin())

    const res = await axios.post('/api/users', userData)

    dispatch(registerUserSuccess(res.data.token))
    dispatch(authenticateUser())
    onSuccess()
  } catch (error) {
    handleErrorResponse(error, dispatch)
    dispatch(registerUserError())
    onError()
  }
}

export const loginUser = (userData, onSuccess, onError) => async dispatch => {
  try {
    dispatch(loginUserBegin())

    const res = await axios.post('/api/auth', userData)

    dispatch(loginUserSuccess(res.data.token))
    dispatch(authenticateUser())
    onSuccess()
  } catch (error) {
    handleErrorResponse(error, dispatch)
    dispatch(loginUserError())
    onError()
  }
}
