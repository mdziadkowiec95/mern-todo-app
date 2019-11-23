import React from 'react'
import PropTypes from 'prop-types'
import styles from './Checkbox.module.scss'

const Checkbox = ({ id, name }) => {
  return (
    <label htmlFor={name}>
      <input type="checkbox" id={id ? id : name} name={name} />
      <span className={styles.checkmark}></span>
    </label>
  )
}

Checkbox.propTypes = { 
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default Checkbox
