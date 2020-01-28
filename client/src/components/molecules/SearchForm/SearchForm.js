import React, { useState } from 'react'
import styles from './SearchForm.module.scss'
import TextField from '../../atoms/TextField/TextField'

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleQueryChange = e => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <div className={styles.searchField}>
        <TextField
          inputValue={searchQuery}
          onChangeFn={handleQueryChange}
          onBlurFn={handleQueryChange}
          name="searchQuery"
          placeholder="Search for task..."
          isFlex
          noMargin
        />
      </div>
      <div>
        <li>1214</li>
        <li>1214</li>
        <li>1214</li>
        <li>1214</li>
      </div>
    </div>
  )
}

SearchForm.propTypes = {}

export default SearchForm
