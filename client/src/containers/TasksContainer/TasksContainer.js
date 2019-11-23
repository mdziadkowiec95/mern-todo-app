import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TaskListTemplate from '../../templates/TaskListTemplate/TaskListTemplate'
import TaskCard from '../../components/molecules/TaskCard/TaskCard'
import { bindActionCreators } from 'redux'
import { getTasks } from '../../store/tasks/async-actions'

class TasksContainer extends Component {
  componentDidMount() {
    // this.props.getTasks()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      console.log(this.props.match.url)
    }
  }
  render() {
    const { tasks } = this.props

    return (
      <div>
        <TaskListTemplate>
          {tasks && tasks.length > 0 ? (
            tasks.map(task => (
              <li key={task._id}>
                <TaskCard {...task} />
              </li>
            ))
          ) : (
            <h3>No tasks found!</h3>
          )}
        </TaskListTemplate>
      </div>
    )
  }
}

TasksContainer.propTypes = {
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object.isRequired,
}

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.taskList,
})

const mapDispatchToProps = dispatch => bindActionCreators({ getTasks }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer)
