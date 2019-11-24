import React from 'react'
import PropTypes from 'prop-types'

const TaskListTemplate = ({ children }) => {
  return (
    <div>
      <ul>{children}</ul>
    </div>
  )
}

TaskListTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TaskListTemplate
