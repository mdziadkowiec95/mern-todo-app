import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../components/organisms/Sidebar/Sidebar'
import styles from './AppLayoutTemplate.module.scss'

const AppLayoutTemplate = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div className={styles.main}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  )
}

AppLayoutTemplate.propTypes = {
  children: PropTypes.node,
}
export default AppLayoutTemplate
