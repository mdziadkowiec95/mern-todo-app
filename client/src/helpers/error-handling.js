import { notifyUser } from '../store/notifications/thunks'

export const handleErrorResponse = (error, dispatch) => {
  const errors = error.response.data.errors

  if (error.response.status === 500) {
    dispatch(notifyUser('Internal Server Error', 'error'))
  } else {
    errors.forEach(err => {
      dispatch(notifyUser(err.msg, 'error'))
    })
  }
}
