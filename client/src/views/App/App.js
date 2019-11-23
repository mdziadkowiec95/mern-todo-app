import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../components/organisms/Sidebar/Sidebar'
import styles from './App.module.scss'
import { Switch, Route } from 'react-router'
import TaskBoard from './TaskBoard/TaskBoard'
import AppTemplate from '../../templates/AppTemplate/AppTemplate'
import ProjectDetails from './ProjectDetails/ProjectDetails'
const App = ({ match }) => (
  <AppTemplate>
    <div className={styles.main}>
      <Switch>
        <Route exact path={match.path} component={TaskBoard} />
        <Route path={`${match.path}/inbox`} component={TaskBoard} />
        <Route path={`${match.path}/today`} component={TaskBoard} />
        <Route path={`${match.path}/next-week`} component={TaskBoard} />
        <Route path={`${match.path}/label/:labelIds`} component={TaskBoard} />
        <Route exact path={`${match.path}/project/:projectId`} component={TaskBoard} />
        <Route path={`${match.path}/project/:projectId/details`} component={ProjectDetails} />
      </Switch>
    </div>
  </AppTemplate>
)

App.propTypes = {
  match: PropTypes.object.isRequired,
}

export default App
