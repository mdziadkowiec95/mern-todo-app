import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSingleProject } from '../../store/projects/async-actions'
import { getTasks } from '../../store/tasks/async-actions'
import TaskListTemplate from '../../templates/TaskListTemplate/TaskListTemplate'
import TaskCard from '../../components/molecules/TaskCard/TaskCard'
import Button from '../../components/atoms/Button/Button'
import ButtonLink from '../../components/atoms/ButtonLink/ButtonLink'
import ProjectTasks from '../../views/App/ProjectTasks/ProjectTasks'

class ProjectContainer extends Component {
  componentDidMount() {
    this.fetchProjectData()
  }

  fetchProjectData = () => {
    const { getSingleProject, match } = this.props
    const projectId = match.params.id

    getSingleProject(projectId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) this.fetchProjectData()
  }

  render() {
    const { project, match } = this.props

    return (
      <div>
        <h1 style={{ backgroundColor: project.color }}>{project.name}</h1>
      </div>
    )
  }
}
const mapStateToProps = ({ tasks, projects }) => ({
  project: projects.project,
})
const mapDispatchToProps = dispatch => bindActionCreators({ getSingleProject }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)
