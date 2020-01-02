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
  updateTaskBegin,
  updateTaskSuccess,
  updateTaskError,
} from './actions'
import { handleErrorResponse } from '../../helpers'
import { toggleAddTaskModal } from '../ui/actions'
import { notifyUser } from '../notifications/thunks'

export const getTasks = params => async dispatch => {
  try {
    dispatch(getTasksBegin())
    const res = await axios.get('/api/tasks', {
      params,
    })

    const payload = !res.data.errors ? res.data : []

    return dispatch(getTasksSuccess(payload))
  } catch (error) {
    handleErrorResponse(error, dispatch)
    dispatch(getTasksError())
    return error
  }
}

export const addTask = (taskData, onSuccess, onError) => async dispatch => {
  try {
    dispatch(addTaskBegin())

    const res = await axios.post('/api/tasks', taskData)

    onSuccess()
    dispatch(addTaskSuccess(res.data))
    dispatch(toggleAddTaskModal(false))
  } catch (error) {
    onError()
    dispatch(addTaskError())
    handleErrorResponse(error, dispatch)
  }
}

export const updateTask = (taskId, updatedTask) => async dispatch => {
  try {
    dispatch(updateTaskBegin())

    const payload = {
      taskId, // Attach 'taskId' param to the payload (needed to update task)
      ...updatedTask,
    }

    const res = await axios.post('/api/tasks', payload)

    return dispatch(updateTaskSuccess(res.data))
  } catch (error) {
    dispatch(updateTaskError())
    handleErrorResponse(error, dispatch)
  }
}

export const removeTask = taskId => async dispatch => {
  try {
    dispatch(removeTaskBegin())

    // return
    const res = await axios.delete(`/api/tasks/${taskId}`)

    dispatch(removeTaskSuccess(taskId))
    dispatch(notifyUser(res.data.msg, 'success'))
  } catch (error) {
    dispatch(removeTaskError())
    handleErrorResponse(error)
  }
}
