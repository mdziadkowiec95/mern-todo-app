import { types } from './types'

export const toggleSidebar = isOpen => ({
  type: types.TOGGLE_SIDEBAR,
  payload: isOpen,
})
