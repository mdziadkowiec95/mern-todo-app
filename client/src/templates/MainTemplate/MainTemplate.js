import React from 'react'
import styles from './MainTemplate.module.scss'
import PropTypes from 'prop-types'
import Container from '../Container/Container'

const MainTemplate = ({ children }) => (
  <div className={styles.main}>
    <Container>{children}</Container>
  </div>
)

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainTemplate
