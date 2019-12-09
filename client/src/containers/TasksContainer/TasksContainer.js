import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TaskListTemplate from '../../templates/TaskListTemplate/TaskListTemplate'
import TaskCard from '../../components/molecules/TaskCard/TaskCard'
import { bindActionCreators, compose } from 'redux'
import { getTasks } from '../../store/tasks/async-actions'
import config from '../../config'
import { setPageContext } from '../../store/tasks/actions'

class TasksContainer extends Component {
  componentDidMount() {
    console.log(`TaskContainer mounted ${this.props.pageType}`)
    this.fetchTasks()
  }
  componentDidUpdate(prevProps) {
    const { pageType, match } = this.props
    const pageTypeChanged = prevProps.pageType !== pageType
    const idChanged = prevProps.match.params.id !== match.params.id

    if (pageTypeChanged || idChanged) {
      console.log(`TaskContainer updated ${pageType}`)
      this.fetchTasks()
    }
  }

  fetchTasks() {
    const {
      pageType,
      match: { params },
      setPageContext,
      getTasks,
    } = this.props

    if (pageType) {
      const pageContext = {
        type: pageType,
        id: params.id,
      }
      setPageContext(pageContext)

      const reqParams = {}

      if (pageType === 'inbox') {
        reqParams.status = 'inbox'
      } else if (pageType === 'today') {
        reqParams.timePeriod = 'today'
      } else if (pageType === 'next-week') {
        reqParams.timePeriod = 'nextWeek'
      } else if (pageType === 'label') {
        reqParams.labelId = params.id
      } else if (pageType === 'project') {
        reqParams.projectId = params.id
      }

      getTasks(reqParams)
    }
  }
  render() {
    const { tasks, isLoading } = this.props

    return (
      <div>
        <TaskListTemplate isLoading={isLoading}>
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
  setPageContext: PropTypes.func.isRequired,
  pageType: PropTypes.oneOf(config.pageTypes),
  tasks: PropTypes.array,
  match: PropTypes.object.isRequired,
}

TasksContainer.defaultProps = {
  tasks: [],
  isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.taskList,
  isLoading: tasks.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators({ getTasks, setPageContext }, dispatch)

export default compose(connect(mapStateToProps, mapDispatchToProps))(TasksContainer)
