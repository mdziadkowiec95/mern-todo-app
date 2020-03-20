import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { getTasks } from '../../store/tasks/async-actions'
import config from '../../config'
import { setPageContext } from '../../store/tasks/actions'
import TaskList from '../../components/molecules/TaskList/TaskList'

class TasksContainer extends Component {
  componentDidMount() {
    this.fetchTasks()
  }
  componentDidUpdate(prevProps) {
    const { pageType, match } = this.props
    const pageTypeChanged = prevProps.pageType !== pageType
    const idChanged = prevProps.match.params.id !== match.params.id

    if (pageTypeChanged || idChanged) {
      // eslint-disable-next-line
      console.log(`Current page type: ${pageType}`)
      if (pageType) this.fetchTasks()
    }
  }

  getTasksRequestFilters(pageType, routeId) {
    // Construct query param filters to pass to tasks GET request
    const filters = {}

    switch (pageType) {
      case 'inbox':
        if (routeId) filters.taskId = routeId
        break
      case 'today':
        filters.timePeriod = 'today'
        break
      case 'next-week':
        filters.timePeriod = 'nextWeek'
        break
      case 'label':
        filters.labelId = routeId
        break
      case 'project':
        filters.projectId = routeId
        break
      default:
    }

    return filters
  }

  async fetchTasks() {
    const {
      pageType,
      match: { params },
      setPageContext,
      getTasks,
    } = this.props

    const pageContext = {
      type: pageType,
      id: params.id,
    }

    setPageContext(pageContext)
    const reqParams = this.getTasksRequestFilters(pageType, params.id)
    await getTasks(reqParams)
  }
  render() {
    const { tasks, pageType, isLoading } = this.props

    return <TaskList pageType={pageType} tasks={tasks} isLoading={isLoading} />
  }
}

TasksContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
