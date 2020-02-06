import { types } from './types'

const initialState = {
  project: null,
  isLoading: false,
  uploadProgress: {
    percentCompleted: 0,
  },
}

export const projectsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_SINGLE_PROJECT_BEGIN:
    case types.CREATE_PROJECT_BEGIN:
    case types.REMOVE_PROJECT_BEGIN:
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
    case types.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        project: payload,
        isLoading: false,
      }

    case types.GET_SINGLE_PROJECT_ERROR:
      return {
        ...state,
        project: null,
        isLoading: false,
      }
    case types.REMOVE_PROJECT_SUCCESS:
      return {
        ...state,
        project: null,
        isLoading: false,
      }
    case types.CREATE_PROJECT_ERROR:
    case types.REMOVE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case types.UPDATE_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: {
          percentCompleted: payload.percentCompleted,
        },
      }

    default:
      return state
  }
}
