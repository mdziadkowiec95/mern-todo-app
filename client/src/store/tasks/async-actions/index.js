import axios from 'axios'
import { getTasksBegin, getTasksSuccess, getTasksError } from '../actions'
import { handleErrorResponse } from '../../../helpers'

export const getTasks = () => async dispatch => {
  try {
    dispatch(getTasksBegin())
    const res = await axios.get('/api/tasks')

    dispatch(getTasksSuccess(res.data))
  } catch (error) {
    dispatch(getTasksError())
    handleErrorResponse(error)
  }
}
