import React from 'react'
import styles from './FormWrapper.module.scss'
import PropTypes from 'prop-types'

const FormWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FormWrapper
