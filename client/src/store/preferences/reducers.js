import { types } from './types'

const initialState = {
  preferences: null, // All preferences of the User
  labels: [], // List of User labels
  projects: [], // List of projects (name & color)
  isLoading: false,
}

export const preferencesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_PREFERENCES_BEGIN:
    case types.GET_LABELS_AND_PROJECTS_BEGIN:
    case types.ADD_LABEL_BEGIN:
    case types.EDIT_LABEL_BEGIN:
    case types.REMOVE_LABEL_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case types.GET_PREFERENCES_SUCCESS:
      return {
        ...state,
        preferences: payload,
        isLoading: false,
      }
    case types.GET_LABELS_AND_PROJECTS_SUCCESS:
      return {
        ...state,
        labels: payload.labels,
        projects: payload.projects,
        isLoading: false,
      }
    case types.GET_PREFERENCES_ERROR:
    case types.GET_LABELS_AND_PROJECTS_ERROR:
    case types.ADD_LABEL_ERROR:
    case types.EDIT_LABEL_ERROR:
    case types.REMOVE_LABEL_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case types.ADD_LABEL_SUCCESS:
      return {
        ...state,
        labels: payload.updatedLabels,
        isLoading: false,
      }
    case types.EDIT_LABEL_SUCCESS:
      return {
        ...state,
        labels: state.labels.map(label => {
          if (label._id === payload._id) return payload
          return label
        }),
        isLoading: false,
      }
    case types.REMOVE_LABEL_SUCCESS:
      return {
        ...state,
        labels: state.labels.filter(label => label._id !== payload),
        isLoading: false,
      }
    case types.REMOVE_SINGLE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== payload),
        isLoading: false,
      }
    default:
      return state
  }
}
