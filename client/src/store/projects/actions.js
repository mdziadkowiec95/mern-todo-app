import { types } from './types'

/**
 * @description This file includes all action creators related to the 'projects' feature
 * @returns {Object} redux action object
 */

export const getSingleProjectBegin = () => ({
  type: types.GET_SINGLE_PROJECT_BEGIN,
})

/**
 * @param {Object} projectData object representing single project data
 */
export const getSingleProjectSuccess = projectData => ({
  type: types.GET_SINGLE_PROJECT_SUCCESS,
  payload: projectData,
})

export const getSingleProjectError = () => ({
  type: types.GET_SINGLE_PROJECT_ERROR,
})

export const createProjectBegin = () => ({
  type: types.CREATE_PROJECT_BEGIN,
})

/**
 * @param {Object} projectData object representing single project data
 */
export const createProjectSuccess = projectData => ({
  type: types.CREATE_PROJECT_SUCCESS,
  payload: projectData,
})

export const createProjectError = () => ({
  type: types.CREATE_PROJECT_ERROR,
})

export const removeProjectBegin = () => ({
  type: types.REMOVE_PROJECT_BEGIN,
})

/**
 * @param {string} projectId DB indentifier of an existing project
 */
export const removeProjectSuccess = projectId => ({
  type: types.REMOVE_PROJECT_SUCCESS,
  payload: projectId,
})

export const removeProjectError = () => ({
  type: types.REMOVE_PROJECT_ERROR,
})

export const uploadProjectFilesBegin = () => ({
  type: types.UPLOAD_PROJECT_FILES_BEGIN,
})

export const uploadProjectFilesSuccess = uploadedFiles => ({
  type: types.UPLOAD_PROJECT_FILES_SUCCESS,
  payload: {
    uploadedFiles,
  },
})

export const uploadProjectFilesError = () => ({
  type: types.UPLOAD_PROJECT_FILES_ERROR,
})
