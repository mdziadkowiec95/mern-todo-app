import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router'
import TaskBoard from './TaskBoard/TaskBoard'
import AppTemplate from '../../templates/AppTemplate/AppTemplate'
import ProjectMain from './ProjectMain/ProjectMain'
import Preferences from '../Preferences/Preferences'
import CreateProject from './CreateProject/CreateProject'
import AppLayoutTemplate from '../../templates/AppLayoutTemplate/AppLayoutTemplate'
import ProjectTasks from './ProjectTasks/ProjectTasks'

const App = ({ match }) => (
  <AppTemplate>
    <AppLayoutTemplate match={match}>
      <Switch>
        <Route path={`${match.path}/preferences`} component={Preferences} />
        <Route exact path={match.path} component={() => <Redirect to={`${match.path}/today`} />} />
        <Route
          exact
          path={`${match.path}/inbox`}
          render={props => <TaskBoard {...props} pageType="inbox" />}
        />
        <Route
          exact
          path={`${match.path}/inbox/:id`}
          render={props => <TaskBoard {...props} pageType="inbox" />}
        />
        <Route
          exact
          path={`${match.path}/today`}
          render={props => <TaskBoard {...props} pageType="today" />}
        />
        <Route
          exact
          path={`${match.path}/next-week`}
          render={props => <TaskBoard {...props} pageType="next-week" />}
        />
        <Route
          exact
          path={`${match.path}/label/:id`}
          render={props => <TaskBoard {...props} pageType="label" />}
        />
        <Route
          exact
          path={`${match.path}/project/:id`}
          render={props => <ProjectMain {...props} pageType="project" />}
        />
        <Route
          exact
          path={`${match.path}/project/:id/details`}
          render={props => <ProjectTasks {...props} pageType="project" />}
        />
        <Route path={`${match.path}/create-project`} component={CreateProject} />
      </Switch>
    </AppLayoutTemplate>
  </AppTemplate>
)

App.propTypes = {
  match: PropTypes.object.isRequired,
}

export default App
