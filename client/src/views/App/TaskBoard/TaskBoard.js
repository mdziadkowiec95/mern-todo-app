import React from 'react'
import PropTypes from 'prop-types'
import TasksContainer from '../../../containers/TasksContainer/TasksContainer'

const TaskBoard = ({ match }) => {
  return <TasksContainer match={match} />
}

TaskBoard.propTypes = {
  match: PropTypes.object.isRequired,
}

export default TaskBoard
