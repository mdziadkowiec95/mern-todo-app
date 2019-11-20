import { types } from '../types'

const initialState = {
  taskList: [],
  isLoading: false,
}

export const tasksReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_TASKS_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case types.GET_TASKS_SUCCESS:
      return {
        ...state,
        taskList: payload.taskList,
        isLoading: false,
      }
    case types.GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
