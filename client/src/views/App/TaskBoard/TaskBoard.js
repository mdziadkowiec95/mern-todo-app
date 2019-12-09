import React from 'react'
import PropTypes from 'prop-types'
import TasksContainer from '../../../containers/TasksContainer/TasksContainer'
import config from '../../../config'

const TaskBoard = ({ match, pageType }) => {
  return <TasksContainer match={match} pageType={pageType} />
}

TaskBoard.propTypes = {
  match: PropTypes.object.isRequired,
  pageType: PropTypes.oneOf(config.pageTypes),
}

export default TaskBoard
