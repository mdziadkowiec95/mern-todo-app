import axios from 'axios'
import {
  getPreferencesBegin,
  getPreferencesSuccess,
  getPreferencesError,
  getLabelsAndProjectsBegin,
  getLabelsAndProjectsSuccess,
  getLabelsAndProjectsError,
  addLabelSuccess,
  addLabelError,
  addLabelBegin,
  editLabelBegin,
  editLabelSuccess,
  editLabelError,
  removeLabelBegin,
  removeLabelSuccess,
  removeLabelError,
} from './actions'
import { handleErrorResponse } from '../../helpers'

export const getPreferences = () => async dispatch => {
  try {
    dispatch(getPreferencesBegin())
    const res = await axios.get('/api/preferences')

    dispatch(getPreferencesSuccess(res.data))
  } catch (error) {
    dispatch(getPreferencesError())
    handleErrorResponse(error, dispatch)
  }
}

export const getLabelsAndProjects = () => async dispatch => {
  try {
    dispatch(getLabelsAndProjectsBegin())
    const res = await axios.get('/api/preferences/labels-and-projects')

    dispatch(getLabelsAndProjectsSuccess(res.data))
  } catch (error) {
    dispatch(getLabelsAndProjectsError())
    handleErrorResponse(error, dispatch)
  }
}

export const addLabel = (name, color) => async dispatch => {
  try {
    dispatch(addLabelBegin())

    const reqPayload = {
      label: {
        name,
        color,
      },
    }

    const res = await axios.put('/api/preferences/labels', reqPayload)
    const updatedLabels = res.data

    return dispatch(addLabelSuccess(updatedLabels))
  } catch (error) {
    handleErrorResponse(error, dispatch)
    return dispatch(addLabelError())
  }
}

export const editLabel = (_id, name, color) => async dispatch => {
  try {
    dispatch(editLabelBegin())

    const reqPayload = {
      label: {
        name,
        color,
      },
    }

    const res = await axios.put(`/api/preferences/labels/${_id}`, reqPayload)
    const updatedLabel = res.data

    return dispatch(editLabelSuccess(updatedLabel))
  } catch (error) {
    handleErrorResponse(error, dispatch)
    return dispatch(editLabelError())
  }
}

export const removeLabel = labelId => async dispatch => {
  try {
    dispatch(removeLabelBegin())

    const res = await axios.delete(`/api/preferences/labels/${labelId}`)
    const removedLabelId = res.data.removedLabelId

    return dispatch(removeLabelSuccess(removedLabelId))
  } catch (error) {
    handleErrorResponse(error, dispatch)
    return dispatch(removeLabelError())
  }
}
