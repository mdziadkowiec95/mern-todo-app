import React from 'react'
import styles from './FormErrorMessage.module.scss'
import PropTypes from 'prop-types'

const FormErrorMessage = ({ errors }) => (
  <div className={styles.error} id="feedback">
    {errors}
  </div>
)

FormErrorMessage.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
}

export default FormErrorMessage
