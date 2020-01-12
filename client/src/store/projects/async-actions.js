import axios from 'axios'
import {
  getSingleProjectBegin,
  getSingleProjectSuccess,
  createProjectBegin,
  createProjectSuccess,
  createProjectError,
  removeProjectBegin,
  removeProjectSuccess,
  removeProjectError,
  getSingleProjectError,
} from './actions'
import { handleErrorResponse } from '../../helpers'
import { notifyUser } from '../notifications/thunks'
import { removeSingleProject } from '../preferences/actions'

/**
 * @param {String} projectId ID of specific project
 */
export const getSingleProject = projectId => async dispatch => {
  try {
    dispatch(getSingleProjectBegin())

    const res = await axios.get(`/api/projects/${projectId}`)

    dispatch(getSingleProjectSuccess(res.data))
  } catch (error) {
    dispatch(getSingleProjectError())
    handleErrorResponse(error, dispatch)
  }
}

/**
 * @param {Object} projectData ID of specific project
 * with properites:
 * - @property {string} name
 * - @property {string} description
 * - @property {string} color
 */

export const createProject = (projectData, onSuccess) => async dispatch => {
  try {
    const { name, color, description } = projectData

    dispatch(createProjectBegin())

    const reqPayload = {
      name,
      color,
      description,
    }

    const res = await axios.post(`/api/projects`, reqPayload)

    const createdProject = res.data

    onSuccess(createdProject._id)
    return dispatch(createProjectSuccess(createdProject))
  } catch (error) {
    dispatch(createProjectError())
    return handleErrorResponse(error, dispatch)
  }
}

export const removeProject = (projectId, onSuccess) => async dispatch => {
  try {
    dispatch(removeProjectBegin())

    const res = await axios.delete(`/api/projects/${projectId}`)
    const { removedProjectId } = res.data

    dispatch(removeProjectSuccess(removedProjectId))
    dispatch(removeSingleProject(removedProjectId))
    onSuccess()
    return dispatch(notifyUser('Project has been removed!', 'success'))
  } catch (error) {
    dispatch(removeProjectError())
    return handleErrorResponse(error, dispatch)
  }
}
