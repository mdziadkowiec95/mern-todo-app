import { types } from './types'

export const toggleSidebar = isOpen => ({
  type: types.TOGGLE_SIDEBAR,
  payload: isOpen,
})

export const toggleAddTaskModal = isOpen => ({
  type: types.TOGGLE_ADD_TASK_MODAL,
  payload: isOpen,
})

export const toggleAddLabelModal = isOpen => ({
  type: types.TOGGLE_ADD_LABEL_MODAL,
  payload: isOpen,
})
