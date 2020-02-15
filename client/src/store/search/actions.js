import { types } from './types'

// ------ Get quick search results ------ //
export const quickSearchBegin = () => ({
  type: types.QUICK_SEARCH_BEGIN,
})

/**
 * @param {Array} searchResults An array of serach results
 */
export const quickSearchSuccess = searchResults => ({
  type: types.QUICK_SEARCH_SUCCESS,
  payload: {
    results: searchResults,
  },
})

export const quickSearchError = () => ({
  type: types.QUICK_SEARCH_ERROR,
})
