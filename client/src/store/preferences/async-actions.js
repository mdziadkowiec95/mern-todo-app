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
} from './actions'
import { handleErrorResponse } from '../../helpers'
import { toggleAddLabelModal } from '../ui/actions'

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

export const addLabel = (name, color, onSuccess, onError) => async dispatch => {
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

    dispatch(addLabelSuccess(updatedLabels))
    dispatch(toggleAddLabelModal(false))
    onSuccess()
  } catch (error) {
    handleErrorResponse(error, dispatch)
    dispatch(addLabelError())
    onError()
  }
}
