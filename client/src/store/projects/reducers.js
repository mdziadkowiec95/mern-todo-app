import { types } from './types'

const initialState = {
  project: null,
  isLoading: false,
}

export const projectsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_SINGLE_PROJECT_BEGIN:
    case types.CREATE_PROJECT_BEGIN:
    case types.REMOVE_PROJECT_BEGIN:
    case types.REMOVE_PROJECT_FILE_BEGIN:
    case types.UPDATE_PROJECT_BASE_INFO_BEGIN:
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
    case types.UPLOAD_PROJECT_FILE_SUCCESS:
      return {
        ...state,
        project: {
          ...state.project,
          files: [...state.project.files, payload.uploadedFile],
        },
      }
    case types.REMOVE_PROJECT_FILE_SUCCESS:
      return {
        ...state,
        project: {
          ...state.project,
          files: state.project.files.filter(file => file._id !== payload.fileId),
        },
        isLoading: false,
      }
    case types.UPDATE_PROJECT_BASE_INFO_SUCCESS:
      if (!state.project || state.project._id !== payload._id) return state

      const { name, description, color } = payload

      return {
        ...state,
        project: {
          ...state.project,
          name,
          description,
          color,
        },
        isLoading: false,
      }
    case types.CREATE_PROJECT_ERROR:
    case types.REMOVE_PROJECT_ERROR:
    case types.REMOVE_PROJECT_FILE_ERROR:
    case types.UPDATE_PROJECT_BASE_INFO_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
