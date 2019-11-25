import { types } from './types'

export const getTasksBegin = () => ({
  type: types.GET_TASKS_BEGIN,
})

/**
 * @param {Array} tasks An array of tasks
 */
export const getTasksSuccess = (pageContext, tasks) => ({
  type: types.GET_TASKS_SUCCESS,
  payload: {
    pageContext,
    taskList: tasks,
  },
})

export const getTasksError = () => ({
  type: types.GET_TASKS_ERROR,
})

export const addTaskBegin = () => ({
  type: types.ADD_TASK_BEGIN,
})

/**
 * @param {Object} taskData New task data
 */
export const addTaskSuccess = taskData => ({
  type: types.ADD_TASK_SUCCESS,
  payload: taskData,
})

export const addTaskError = () => ({
  type: types.ADD_TASK_ERROR,
})

export const removeTaskBegin = () => ({
  type: types.REMOVE_TASK_BEGIN,
})

/**
 * @param {Object} taskData New task data
 */
export const removeTaskSuccess = taskId => ({
  type: types.REMOVE_TASK_SUCCESS,
  payload: taskId,
})

export const removeTaskError = () => ({
  type: types.REMOVE_TASK_ERROR,
})
