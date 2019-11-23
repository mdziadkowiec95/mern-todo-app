import { types } from './types'

export const initialState = {
  isSidebarOpen: false,
}

export const uiReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: payload,
      }
    default:
      return state
  }
}
