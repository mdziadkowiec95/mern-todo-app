import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TaskListTemplate from '../../templates/TaskListTemplate/TaskListTemplate'
import TaskCard from '../../components/molecules/TaskCard/TaskCard'
import { bindActionCreators, compose } from 'redux'
import { getTasks } from '../../store/tasks/async-actions'
import withPageContext from '../../hoc/withPageContext'
import config from '../../config'

class TasksContainer extends Component {
  constructor() {
    super()

    this.state = {
      lastPageContext: '',
    }
  }
  componentDidMount() {
    this.fetchTasks()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageContext !== this.props.pageContext) {
      this.fetchTasks()
    }
  }
  fetchTasks() {
    console.log(this.props)

    if (this.props.pageContext.type) {
      const {
        pageContext,
        match: { params },
        getTasks,
      } = this.props

      const reqParams = {}

      if (pageContext.type === 'inbox') {
        reqParams.status = 'inbox'
      } else if (pageContext.type === 'today') {
        reqParams.timePeriod = 'today'
      } else if (pageContext.type === 'next-week') {
        reqParams.timePeriod = 'nextWeek'
      } else if (pageContext.type === 'label') {
        reqParams.labelId = params.id
      } else if (pageContext.type === 'project') {
        reqParams.projectId = params.id
      }

      // console.log('Tasks request with params', params, pageContext, pageData)
      getTasks(reqParams, pageContext)
    }
  }
  render() {
    const { pageContext, tasks, isLoading } = this.props

    return (
      <>
        <TaskListTemplate isLoading={isLoading}>
          {tasks.taskList && tasks.taskList.length > 0 ? (
            tasks.taskList.map(task => (
              <li key={task._id}>
                <TaskCard {...task} />
              </li>
            ))
          ) : (
            <h3>No tasks found!</h3>
          )}
        </TaskListTemplate>
      </>
    )
  }
}

TasksContainer.propTypes = {
  getTasks: PropTypes.func.isRequired,
  pageContext: PropTypes.shape({
    type: PropTypes.oneOf(config.pageTypes),
    id: PropTypes.string,
  }),
  tasks: PropTypes.shape({
    pageContext: PropTypes.shape({
      type: PropTypes.string,
      id: PropTypes.string,
    }),
    taskList: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
  }),
  match: PropTypes.object.isRequired,
}

TasksContainer.defaultProps = {
  pageContext: {
    type: 'inbox',
    id: '',
  },
  isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks,
  isLoading: tasks.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({ getTasks }, dispatch)

export default compose(
  withPageContext,
  connect(mapStateToProps, mapDispatchToProps),
)(TasksContainer)
