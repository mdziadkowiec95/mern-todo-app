import { types } from './types'

const initialState = {
  project: {},
  isLoading: false,
}

export const projectsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_SINGLE_PROJECT_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case types.GET_SINGLE_PROJECT_SUCCESS:
      return {
        ...state,
        project: payload,
        isLoading: false,
      }

    case types.GET_SINGLE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
