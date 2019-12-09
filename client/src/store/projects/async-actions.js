import axios from 'axios'
import { getSingleProjectBegin, getSingleProjectSuccess } from './actions'
import { handleErrorResponse } from '../../helpers'

/**
 * @param {String} projectId ID of specific project
 */
export const getSingleProject = projectId => async dispatch => {
  try {
    dispatch(getSingleProjectBegin())

    const res = await axios.get(`/api/projects/${projectId}`)

    dispatch(getSingleProjectSuccess(res.data))
  } catch (error) {
    dispatch(getSingleProjectBegin())
    handleErrorResponse(error, dispatch)
  }
}
