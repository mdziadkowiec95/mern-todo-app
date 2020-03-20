import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import styles from './SearchForm.module.scss'
import TextField from '../../atoms/TextField/TextField'
import useClickOutside from '../../../hooks/useClickOutside'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

const SearchForm = ({ quickSearch, suggestions, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)

  const close = useCallback(() => setIsSearchActive(false), [setIsSearchActive])
  const containerRef = useClickOutside(close)

  const [debouncedQuickSerach] = useDebouncedCallback(query => {
    quickSearch(query)
  }, 500)

  const handleQueryChange = e => {
    if (searchQuery !== e.target.value) {
      setSearchQuery(e.target.value)
      debouncedQuickSerach(e.target.value)
    }
  }

  const handleOnChange = e => {
    handleQueryChange(e)
    setIsSearchActive(true)
  }

  const handleOnBlur = e => {
    handleQueryChange(e)
  }

  const handleSuggestionClick = () => {
    setIsSearchActive(false)
    setSearchQuery('')
  }

  return (
    <div className={cn('form')} ref={containerRef}>
      <div className={cn('form__field')}>
        <TextField
          inputValue={searchQuery}
          onChangeFn={handleOnChange}
          onBlurFn={handleOnBlur}
          onFocusFn={() => setIsSearchActive(true)}
          name="searchQuery"
          placeholder="Serach by title..."
          isFlex
          noMargin
        />
      </div>
      {isSearchActive && searchQuery && (
        <ul className={cn('form__suggestion-list')}>
          {suggestions.length > 0 ? (
            suggestions.map(suggestion => (
              <li key={suggestion._id} className={cn('form__suggestion-item')}>
                <Link
                  to={`/app/inbox/${suggestion._id}`}
                  onClick={handleSuggestionClick}
                  className={cn('form__suggestion-link')}
                >
                  {suggestion.title}
                </Link>
              </li>
            ))
          ) : (
            <li className={cn('form__suggestion-no-items')}>
              {!isLoading ? 'No tasks found...' : 'Loading...'}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

SearchForm.propTypes = {}

export default SearchForm
