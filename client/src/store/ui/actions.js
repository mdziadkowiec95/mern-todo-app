import { types } from './types'

export const toggleSidebar = isOpen => ({
  type: types.TOGGLE_SIDEBAR,
  payload: isOpen,
})

export const toggleAddTaskModal = isOpen => ({
  type: types.TOGGLE_ADD_TASK_MODAL,
  payload: isOpen,
})

/**
 * @param {Boolean} isOpen flag to toggle AddTaskModal
 * @param {String} type (optional) 'label' or 'project' (it tells what item to add)
 */

export const toggleAddLabelModal = (isOpen, type = '') => ({
  type: types.TOGGLE_ADD_LABEL_MODAL,
  payload: {
    isOpen,
    type,
  },
})
