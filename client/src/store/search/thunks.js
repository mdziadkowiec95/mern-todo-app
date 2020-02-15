import * as SearchActions from './actions'
import axios from 'axios'

export const quickSearch = query => async dispatch => {
  try {
    dispatch(SearchActions.quickSearchBegin())

    const res = await axios.get(`/api/tasks/search?searchQuery=${query}`)
    const { results } = res.data

    return dispatch(SearchActions.quickSearchSuccess(results))
  } catch (error) {
    dispatch(SearchActions.quickSearchError())
    // handleErrorResponse(error, dispatch)
  }
}
