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

export const toggleManageLabelsModal = isOpen => ({
  type: types.TOGGLE_MANAGE_LABELS_MODAL,
  payload: isOpen,
})

export const updateUploadList = uploadItem => ({
  type: types.UPDATE_UPLOAD_LIST,
  payload: uploadItem,
})
