import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../components/organisms/Sidebar/Sidebar'
import styles from './AppLayoutTemplate.module.scss'

const AppLayoutTemplate = ({ children }) => (
  <div className={styles.main}>
    <Sidebar />
    <div className={styles.content}>{children}</div>
  </div>
)

AppLayoutTemplate.propTypes = {
  children: PropTypes.node,
}
export default AppLayoutTemplate
