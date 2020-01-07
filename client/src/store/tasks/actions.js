import { types } from './types'

// ------ Set pageContext ------ //
export const setPageContext = pageContext => ({
  type: types.SET_PAGE_CONTEXT,
  payload: pageContext,
})

// ------ Get all tasks for current view ------ //
export const getTasksBegin = () => ({
  type: types.GET_TASKS_BEGIN, 
})

/**
 * @param {Array} tasks An array of tasks
 * @param {String} pageContext A value to provide info about current view
 */
export const getTasksSuccess = tasks => ({
  type: types.GET_TASKS_SUCCESS,
  payload: tasks,
})

export const getTasksError = () => ({
  type: types.GET_TASKS_ERROR,
})

// ------ Add new task ------ //
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

// ------ Update existing task ------ //
export const updateTaskBegin = () => ({
  type: types.UPDATE_TASK_BEGIN,
})

/**
 * @param {Object} taskData New task data
 */
export const updateTaskSuccess = taskData => ({
  type: types.UPDATE_TASK_SUCCESS,
  payload: taskData,
})

export const updateTaskError = () => ({
  type: types.UPDATE_TASK_ERROR,
})

// ------ Remove existing task ------ //
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
