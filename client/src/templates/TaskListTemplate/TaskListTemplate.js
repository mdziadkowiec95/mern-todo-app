import React from 'react'
import PropTypes from 'prop-types'

const TaskListTemplate = ({ children }) => {
  return (
    <div>
      <h2>Task List component</h2>
      <ul>{children}</ul>
    </div>
  )
}

TaskListTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TaskListTemplate
