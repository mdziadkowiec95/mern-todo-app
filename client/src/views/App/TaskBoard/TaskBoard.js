import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import TaskListTemplate from '../../../templates/TaskListTemplate/TaskListTemplate'
import TaskCard from '../../../components/molecules/TaskCard/TaskCard'
import { Route } from 'react-router-dom'
import ProjectDetails from '../ProjectDetails/ProjectDetails'

const TaskBoard = ({ match }) => {
  // eslint-disable-next-line no-console
  useEffect(() => console.log(match.url), [match])

  return (
    <div>
      <div>Test dynamic route. URL = {match.url}</div>
      <TaskListTemplate>
        <TaskCard />
        <Route path={`${match.path}/details`} component={ProjectDetails} />
      </TaskListTemplate>
      <button>Add Task</button>
    </div>
  )
}

TaskBoard.propTypes = {
  match: PropTypes.object.isRequired,
}

export default TaskBoard
