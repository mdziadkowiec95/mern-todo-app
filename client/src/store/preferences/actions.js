import { types } from './types'

/** ---  Get All Preferences of the User --- */
export const getPreferencesBegin = () => ({
  type: types.GET_PREFERENCES_BEGIN,
})

/**
 * @param {Object} preferences Object with User preferences
 */
export const getPreferencesSuccess = preferences => ({
  type: types.GET_PREFERENCES_SUCCESS,
  payload: preferences,
})

export const getPreferencesError = () => ({
  type: types.GET_PREFERENCES_ERROR,
})

/** --- Get list of labels and projects of the User --- */
export const getLabelsAndProjectsBegin = () => ({
  type: types.GET_LABELS_AND_PROJECTS_BEGIN,
})

/**
 * @param {Object} preferences Object with User preferences
 */
export const getLabelsAndProjectsSuccess = ({ labels, projects }) => ({
  type: types.GET_LABELS_AND_PROJECTS_SUCCESS,
  payload: {
    labels,
    projects,
  },
})

export const getLabelsAndProjectsError = () => ({
  type: types.GET_LABELS_AND_PROJECTS_ERROR,
})

/** --- Add new label --- */
export const addLabelBegin = () => ({
  type: types.ADD_LABEL_BEGIN,
})
export const addLabelSuccess = updatedLabels => ({
  type: types.ADD_LABEL_SUCCESS,
  payload: {
    updatedLabels,
  },
})
export const addLabelError = () => ({
  type: types.ADD_LABEL_ERROR,
})

/** --- Update existing label --- */
export const editLabelBegin = () => ({
  type: types.EDIT_LABEL_BEGIN,
})
export const editLabelSuccess = editedLabel => ({
  type: types.EDIT_LABEL_SUCCESS,
  payload: editedLabel,
})
export const editLabelError = () => ({
  type: types.EDIT_LABEL_ERROR,
})

/** --- Remove existing label --- */
export const removeLabelBegin = () => ({
  type: types.REMOVE_LABEL_BEGIN,
})
export const removeLabelSuccess = removeLabelId => ({
  type: types.REMOVE_LABEL_SUCCESS,
  payload: removeLabelId,
})
export const removeLabelError = () => ({
  type: types.REMOVE_LABEL_ERROR,
})

/** --- Remove single project --- */
export const removeSingleProject = projectId => ({
  type: types.REMOVE_SINGLE_PROJECT,
  payload: projectId,
})

/**
 * @param {Object} project
 * - @param {string} project._id
 * - @param {string} project.name
 * - @param {string} project.color
 */
export const addSingleProject = project => ({
  type: types.ADD_SINGLE_PROJECT,
  payload: {
    project,
  },
})

/**
 * @param {Object} project
 * - @param {string} project._id
 * - @param {string} project.name
 * - @param {string} project.color
 */
export const updateSingleProject = ({ _id, name, color }) => ({
  type: types.UPDATE_SINGLE_PROJECT,
  payload: {
    _id,
    name,
    color,
  },
})
