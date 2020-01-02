import React from 'react'
import PropTypes from 'prop-types'
import TasksContainer from '../../../containers/TasksContainer/TasksContainer'
import config from '../../../config'

const TaskBoard = ({ match, location, pageType }) => {
  return <TasksContainer match={match} state={location.state} pageType={pageType} />
}

TaskBoard.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageType: PropTypes.oneOf(config.pageTypes),
}

export default TaskBoard
