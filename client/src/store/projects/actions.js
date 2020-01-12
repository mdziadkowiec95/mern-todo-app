import { types } from './types'

// ------ Get single project ------ //
export const getSingleProjectBegin = () => ({
  type: types.GET_SINGLE_PROJECT_BEGIN,
})

export const getSingleProjectSuccess = projectData => ({
  type: types.GET_SINGLE_PROJECT_SUCCESS,
  payload: projectData,
})

export const getSingleProjectError = () => ({
  type: types.GET_SINGLE_PROJECT_ERROR,
})

// ------ Create new project ------ //
export const createProjectBegin = () => ({
  type: types.CREATE_PROJECT_BEGIN,
})

export const createProjectSuccess = projectData => ({
  type: types.CREATE_PROJECT_SUCCESS,
  payload: projectData,
})

export const createProjectError = () => ({
  type: types.CREATE_PROJECT_ERROR,
})

// ------ Remove existing project ------ //
export const removeProjectBegin = () => ({
  type: types.REMOVE_PROJECT_BEGIN,
})

export const removeProjectSuccess = projectId => ({
  type: types.REMOVE_PROJECT_SUCCESS,
  payload: projectId,
})

export const removeProjectError = () => ({
  type: types.REMOVE_PROJECT_ERROR,
})
