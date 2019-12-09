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
