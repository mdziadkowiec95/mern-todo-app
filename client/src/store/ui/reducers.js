import { types } from './types'

export const initialState = {
  isSidebarOpen: false,
  isAddTaskModalOpen: false,
  isAddLabelModalOpen: false,
  addLabelModalType: '',
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
    case types.TOGGLE_ADD_LABEL_MODAL:
      return {
        ...state,
        isAddLabelModalOpen: payload.isOpen,
        addLabelModalType: payload.type,
      }
    default:
      return state
  }
}
