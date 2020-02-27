import React from 'react'
import styles from './ContentWrapper.module.scss'
import PropTypes from 'prop-types'

const ContentWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ContentWrapper
