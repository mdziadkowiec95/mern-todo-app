import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TaskListTemplate from '../../templates/TaskListTemplate/TaskListTemplate'
import TaskCard from '../../components/molecules/TaskCard/TaskCard'
import ProjectDetails from '../../views/App/ProjectDetails/ProjectDetails'
import { getTasks } from '../../store/tasks/async-actions'
import { bindActionCreators } from '../../../../../../../Library/Caches/typescript/3.6/node_modules/redux'

class TasksContainer extends Component {
  componentDidMount() {
    this.props.getTasks()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      console.log(this.props.match.url)
    }
  }
  render() {
    const { tasks, match } = this.props

    return (
      <div>
        <div>Test dynamic route. URL = {match.url}</div>
        <TaskListTemplate>
          {tasks && tasks.length > 0 && tasks.map(task => <TaskCard key={task._id} {...task} />)}
          {/* <Route path={`${match.path}/details`} component={ProjectDetails} /> */}
        </TaskListTemplate>
        <button>Add Task</button>
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
