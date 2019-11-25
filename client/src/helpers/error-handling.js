import { notifyUser } from '../store/notifications/thunks'

export const handleErrorResponse = (error, dispatch) => {
  const errors = error.response.data.errors

  if (error.response.status === 500) {
    dispatch(notifyUser('Internal Server Error', 'error'))
  } else {
    if (errors.length > 0)
      errors.forEach(err => {
        dispatch(notifyUser(err.msg, 'error'))
      })
  }
}
