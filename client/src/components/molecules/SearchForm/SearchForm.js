import React, { useState } from 'react'
import styles from './SearchForm.module.scss'
import TextField from '../../atoms/TextField/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { quickSearch } from '../../../store/search/thunks'
import { useDebouncedCallback } from 'use-debounce'

const SearchForm = ({ quickSearch, suggestions, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)

  const [debouncedQuickSerach] = useDebouncedCallback(query => {
    quickSearch(query)
  }, 1000)

  const handleQueryChange = e => {
    setSearchQuery(e.target.value)
    debouncedQuickSerach(e.target.value)
  }

  const handleOnChange = e => {
    setIsSearchActive(true)
    handleQueryChange(e)
  }

  const handleOnBlur = e => {
    setIsSearchActive(false)
    handleQueryChange(e)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        <TextField
          inputValue={searchQuery}
          onChangeFn={handleOnChange}
          onBlurFn={handleOnBlur}
          name="searchQuery"
          placeholder="Search for task..."
          isFlex
          noMargin
        />
      </div>
      {!isLoading && isSearchActive && (
        <div className={styles.suggestions}>
          {suggestions.length > 0 ? (
            suggestions.map(suggestion => <li key={suggestion._id}>{suggestion.title}</li>)
          ) : (
            <li>No tasks found...</li>
          )}
        </div>
      )}
    </div>
  )
}

SearchForm.propTypes = {}

const mapDispatchToProps = dispatch => bindActionCreators({ quickSearch }, dispatch)
const mapStateToProps = ({ search }) => ({
  suggestions: search.searchResults,
  isLoading: search.isLoading,
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
