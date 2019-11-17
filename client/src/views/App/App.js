import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Sidebar from '../../components/organisms/Sidebar/Sidebar'
import styles from './App.module.scss'
import { Switch, Route } from 'react-router'
import TaskBoard from './TaskBoard/TaskBoard'
import AppTemplate from '../../templates/AppTemplate/AppTemplate'
const App = ({ match }) => {
  // eslint-disable-next-line no-console
  useEffect(() => console.log(match), [match])

  return (
    <AppTemplate>
      <div className={styles.main}>
        <Sidebar />
        <div className="test">
          <Switch>
            <Route path={`${match.path}/label/:labelIds`} component={TaskBoard} />
            <Route path={`${match.path}/project/:projectId`} component={TaskBoard} />
            <Route path={`${match.path}/today`} component={TaskBoard} />
          </Switch>
        </div>
      </div>
    </AppTemplate>
  )
}

App.propTypes = {
  match: PropTypes.object.isRequired,
}

export default App
