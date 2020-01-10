import { types } from './types'

export const initialState = {
  isSidebarOpen: false,
  isAddTaskModalOpen: false,
  isManageLabelsModalOpen: false,
}

export const uiReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: payload,
      }
    case types.TOGGLE_ADD_TASK_MODAL:
      return {
        ...state,
        isAddTaskModalOpen: payload,
      }
    case types.TOGGLE_MANAGE_LABELS_MODAL:
      return {
        ...state,
        isManageLabelsModalOpen: payload,
      }
    default:
      return state
  }
}
