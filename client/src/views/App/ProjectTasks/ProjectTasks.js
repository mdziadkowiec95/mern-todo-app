import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/atoms/Button/Button'
import ProjectContainer from '../../../containers/ProjectContainer/ProjectContainer'
import TasksContainer from '../../../containers/TasksContainer/TasksContainer'
import config from '../../../config'

const ProjectTasks = ({ match, pageType }) => {
  return (
    <>
      <Button primary asRouterLink goTo={`/app/project/${match.params.id}`}>
        Back to project details
      </Button>

      <TasksContainer match={match} pageType={pageType} />
      {/* <TasksContainer match={match} pageType="project" /> */}
    </>
  )
}

ProjectTasks.propTypes = {
  pageType: PropTypes.oneOf(config.pageTypes),
}

export default ProjectTasks
