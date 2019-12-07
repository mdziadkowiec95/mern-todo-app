import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './App.module.scss'
import { Switch, Route } from 'react-router'
import TaskBoard from './TaskBoard/TaskBoard'
import AppTemplate from '../../templates/AppTemplate/AppTemplate'
import ProjectDetails from './ProjectDetails/ProjectDetails'
import Preferences from '../Preferences/Preferences'

const App = ({ match }) => (
  <AppTemplate>
    <div className={styles.main}>
      <Switch>
        <Route path={`${match.path}/preferences`} component={Preferences} />
        <Route exact path={match.path} component={() => <Redirect to={`${match.path}/today`} />} />
        <Route path={`${match.path}/inbox`} component={TaskBoard} />
        <Route path={`${match.path}/today`} component={TaskBoard} />
        <Route path={`${match.path}/next-week`} component={TaskBoard} />
        <Route path={`${match.path}/label/:id`} component={TaskBoard} />
        <Route exact path={`${match.path}/project/:id`} component={TaskBoard} />
        <Route path={`${match.path}/project/:id/details`} component={ProjectDetails} />
      </Switch>
    </div>
  </AppTemplate>
)

App.propTypes = {
  match: PropTypes.object.isRequired,
}

export default App
