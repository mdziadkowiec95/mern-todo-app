import { types } from './types'

const initialState = {
  isLoading: false,
  searchResults: [],
}

export const searchReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.QUICK_SEARCH_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case types.QUICK_SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: payload.results,
        isLoading: false,
      }
    case types.QUICK_SEARCH_ERROR:
      return {
        ...state,
        searchResults: [],
        isLoading: false,
      }
    default:
      return state
  }
}
