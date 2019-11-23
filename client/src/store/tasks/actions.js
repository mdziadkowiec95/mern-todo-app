import { types } from './types'

export const getTasksBegin = () => ({
  type: types.GET_TASKS_BEGIN,
})

/**
 * @param {Array} tasks An array of tasks
 */
export const getTasksSuccess = tasks => ({
  type: types.GET_TASKS_SUCCESS,
  payload: {
    taskList: tasks,
  },
})

export const getTasksError = () => ({
  type: types.GET_TASKS_ERROR,
})
