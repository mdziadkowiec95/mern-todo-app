import axios from 'axios'
import { handleErrorResponse } from '../../helpers'
import { notifyUser } from '../notifications/thunks'
import * as ProjectsActions from './actions'
import * as PreferencesActions from '../preferences/actions'

/**
 * @param {String} projectId ID of specific project
 */
export const getSingleProject = projectId => async dispatch => {
  try {
    dispatch(ProjectsActions.getSingleProjectBegin())

    const res = await axios.get(`/api/projects/${projectId}`)

    dispatch(ProjectsActions.getSingleProjectSuccess(res.data))
  } catch (error) {
    dispatch(ProjectsActions.getSingleProjectError())
    handleErrorResponse(error, dispatch)
  }
}

/**
 * @param {Object} projectData data object of created project
 * - @param {string} projectData.name
 * - @param {string} projectData.description
 * - @param {string} projectData.color
 * @param {Function} onSuccess callback function which runs component logic after successful request

 */

export const createProject = (projectData, onSuccess) => async dispatch => {
  try {
    const { name, color, description } = projectData

    dispatch(ProjectsActions.createProjectBegin())

    const reqPayload = {
      name,
      color,
      description,
    }

    const res = await axios.post(`/api/projects`, reqPayload)

    const createdProject = res.data

    onSuccess(createdProject._id)
    dispatch(
      PreferencesActions.addSingleProject({
        _id: createdProject._id,
        name: createdProject.name,
        color: createdProject.color,
      }),
    )
    return dispatch(ProjectsActions.createProjectSuccess(createdProject))
  } catch (error) {
    dispatch(ProjectsActions.createProjectError())
    return handleErrorResponse(error, dispatch)
  }
}

/**
 * @param {string} projectId ID of specific project
 * @param {Function} onSuccess callback function which runs component logic after successful request
 */

export const removeProject = (projectId, onSuccess) => async dispatch => {
  try {
    dispatch(ProjectsActions.removeProjectBegin())

    const res = await axios.delete(`/api/projects/${projectId}`)
    const { removedProjectId } = res.data

    dispatch(ProjectsActions.removeProjectSuccess(removedProjectId))
    dispatch(PreferencesActions.removeSingleProject(removedProjectId))
    onSuccess()
    return dispatch(notifyUser('Project has been removed!', 'success'))
  } catch (error) {
    dispatch(ProjectsActions.removeProjectError())
    return handleErrorResponse(error, dispatch)
  }
}
