import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../components/organisms/Sidebar/Sidebar'
import styles from './AppLayoutTemplate.module.scss'

const AppLayoutTemplate = ({ children, match }) => {
  return (
    <div className={styles.main}>
      <Sidebar match={match} />
      <div className={styles.content}>{children}</div>
    </div>
  )
}

AppLayoutTemplate.propTypes = {
  children: PropTypes.node,
  match: PropTypes.object.isRequired,
}
export default AppLayoutTemplate
