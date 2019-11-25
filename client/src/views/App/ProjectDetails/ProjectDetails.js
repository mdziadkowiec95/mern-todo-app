import React from 'react'
import styles from './ProjectDetails.module.scss'
import AppLayoutTemplate from '../../../templates/AppLayoutTemplate/AppLayoutTemplate'

const ProjectDetails = ({ match }) => {
  return (
    <AppLayoutTemplate match={match}>
      <div className={styles.wrapper}>Project Details</div>
    </AppLayoutTemplate>
  )
}

export default ProjectDetails
