import { notifyUser } from '../store/notifications/thunks'

export const handleErrorResponse = (error, dispatch) => {
  // eslint-disable-next-line
  console.error(error)

  const errors = error.response.data.errors

  if (error.response.status === 500) {
    dispatch(notifyUser('Internal Server Error', 'error'))
  } else {
    if (errors && errors.length > 0) {
      errors.forEach(err => {
        dispatch(notifyUser(err.msg, 'error'))
      })
    } else {
      dispatch(notifyUser('Request failed. Try again.', 'error'))
    }
  }
}
