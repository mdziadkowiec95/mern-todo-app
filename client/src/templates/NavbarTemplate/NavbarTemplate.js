import React from 'react'
import styles from './NavbarTemplate.module.scss'
import PropTypes from 'prop-types'

const NavbarTemplate = ({ children }) => {
  return <nav className={styles.nav}>{children}</nav>
}

NavbarTemplate.propTypes = {
  children: PropTypes.node,
}

export default NavbarTemplate
