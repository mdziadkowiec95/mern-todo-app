import axios from 'axios'
import { handleErrorResponse } from '../../helpers'
import { notifyUser } from '../notifications/thunks'
import * as ProjectsActions from './actions'
import * as PreferencesActions from '../preferences/actions'
import * as UIActions from '../ui/actions'
import uuid from 'uuid'

/**
 * @param {String} projectId DB identifier of a specific project
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

/**
 * @param {Object} projectData object representing single project data
 * @param {Function} onSuccess callback function to run as a side effect of a successful request
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
 * @param {Function} onSuccess callback function to run as a side effect of a successful request
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

const handlePromise = promise => {
  return promise.then(data => [data, undefined]).catch(error => Promise.resolve([undefined, error]))
}

export const uploadProjectFiles = (projectId, chosenFiles) => async dispatch => {
  try {
    dispatch(ProjectsActions.uploadProjectFilesBegin())

    console.log(chosenFiles)
    // (preUploadFileList) - provide a list of all upload files data ahead of time.
    // This used when you decide to request multiple uploads at once and you want to validate
    // all files before first request to eventually return validation error early enough.
    const preUploadFileList = chosenFiles.map(file => ({
      fileName: file.fileData.name,
      fileType: file.fileData.type,
      fileSize: file.fileData.size,
    }))

    const promises = chosenFiles.map(async file => {
      const formData = new FormData()
      formData.append('preUploadFileList', JSON.stringify(preUploadFileList))
      formData.append('projectFile', file.fileData, file.fileData.name)

      const uploadId = uuid.v4()

      const [singleUpload, singleUploadError] = await handlePromise(
        axios.put(`/api/projects/${projectId}/upload-files`, formData, {
          onUploadProgress: function(progressEvent) {
            console.log(progressEvent)
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)

            const uploadItem = {
              id: uploadId,
              fileName: file.fileData.name,
              percentCompleted,
            }

            dispatch(UIActions.updateUploadList(uploadItem))
          },
        }),
      )

      // @todo - process each file separately depenging on upload status
      // IF stored successfuly then dispatch action to add file to Redux stroe
      //

      if (singleUpload) {
        console.log('singleUpload', singleUpload)
      } else if (singleUploadError) {
        console.log('singleUploadError', singleUploadError)
      }

      return singleUpload
    })

    // Do I need to run Promsise.all here?? We'll see :-D
    const uploads = await Promise.all(promises)

    console.log('all uploads finished', uploads)

    // dispatch(ProjectsActions.uploadProjectFilesSuccess(formData))
  } catch (error) {
    dispatch(ProjectsActions.uploadProjectFilesError())
    handleErrorResponse(error, dispatch)
  }
}
