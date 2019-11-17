import React from 'react'
import styles from './MainTemplate.module.scss'
import Container from '../Container/Container'
import PropTypes from 'prop-types'

const MainTemplate = ({ children }) => {
  return (
    <div className={styles.main}>
      <Container>{children}</Container>
    </div>
  )
}

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainTemplate
