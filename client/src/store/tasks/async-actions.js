import axios from 'axios'
import {
  getTasksBegin,
  getTasksSuccess,
  getTasksError,
  addTaskBegin,
  addTaskSuccess,
  addTaskError,
  removeTaskBegin,
  removeTaskSuccess,
  removeTaskError,
} from './actions'
import { handleErrorResponse } from '../../helpers'
import { toggleAddTaskModal } from '../ui/actions'

export const getTasks = (params, pageContext) => async dispatch => {
  console.log(pageContext)

  try {
    dispatch(getTasksBegin())
    const res = await axios.get('/api/tasks', {
      params,
    })

    if (!res.data.errors) return dispatch(getTasksSuccess(pageContext, res.data))

    dispatch(getTasksSuccess(pageContext, []))
  } catch (error) {
    dispatch(getTasksError())
    handleErrorResponse(error, dispatch)
  }
}

export const addTask = (taskData, onSuccess, onError) => async dispatch => {
  try {
    dispatch(addTaskBegin())
    console.log(taskData)

    // return
    const res = await axios.post('/api/tasks', taskData)

    onSuccess()
    dispatch(addTaskSuccess(res.data))
    dispatch(toggleAddTaskModal(false))
  } catch (error) {
    onError()
    dispatch(addTaskError())
    handleErrorResponse(error)
  }
}

export const removeTask = taskId => async dispatch => {
  try {
    dispatch(removeTaskBegin())

    // return
    const res = await axios.delete(`/api/tasks/${taskId}`)

    console.log(res)

    dispatch(removeTaskSuccess(taskId))
  } catch (error) {
    dispatch(removeTaskError())
    handleErrorResponse(error)
  }
}
