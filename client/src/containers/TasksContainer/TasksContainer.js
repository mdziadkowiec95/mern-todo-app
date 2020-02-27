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
      console.log(`TaskContainer updated ${pageType}`)
      this.fetchTasks()
    }
  }

  async fetchTasks() {
    const {
      pageType,
      match: { params },
      // eslint-disable-next-line
      state,
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

      await getTasks(reqParams)
    }
  }
  render() {
    const { tasks, pageType, isLoading } = this.props

    return (
      <>
        <TaskList pageType={pageType} tasks={tasks} isLoading={isLoading} />
      </>
    )
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
