import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/atoms/Button/Button'
import TasksContainer from '../../../containers/TasksContainer/TasksContainer'
import config from '../../../config'

const ProjectTasks = ({ match, pageType }) => {
  return (
    <>
      <Button primary asRouterLink goTo={`/app/project/${match.params.id}`}>
        Back to project details
      </Button>

      <TasksContainer match={match} pageType={pageType} />
    </>
  )
}

ProjectTasks.propTypes = {
  pageType: PropTypes.oneOf(config.pageTypes),
  match: PropTypes.object.isRequired,
}

export default ProjectTasks
