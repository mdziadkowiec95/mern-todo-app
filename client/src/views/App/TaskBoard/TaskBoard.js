import React from 'react'
import PropTypes from 'prop-types'
import TasksContainer from '../../../containers/TasksContainer/TasksContainer'
import AppLayoutTemplate from '../../../templates/AppLayoutTemplate/AppLayoutTemplate'

const TaskBoard = ({ match }) => {
  return (
    <>
      <AppLayoutTemplate match={match}>
        <TasksContainer match={match} />
      </AppLayoutTemplate>
    </>
  )
}

TaskBoard.propTypes = {
  match: PropTypes.object.isRequired,
}

export default TaskBoard
