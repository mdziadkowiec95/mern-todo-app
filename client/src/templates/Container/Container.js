import React from 'react'
import styles from './Container.module.scss'
import PropTypes from 'prop-types'

const Container = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container