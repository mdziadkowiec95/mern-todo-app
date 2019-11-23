import React from 'react'
import styles from './MainTemplate.module.scss'
import PropTypes from 'prop-types'

const MainTemplate = ({ children }) => {
  return <div className={styles.main}>{children}</div>
}

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainTemplate
