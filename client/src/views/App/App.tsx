import React, { useEffect } from 'react';
import Navbar from '../../components/organisms/Navbar/Navbar';
import Sidebar from '../../components/organisms/Sidebar/Sidebar';
import styles from './App.module.scss';
import { Switch, Route, RouteComponentProps } from 'react-router';
import TaskBoard from './TaskBoard/TaskBoard';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';

const App: React.FC<RouteComponentProps> = ({ match, children }) => {
  useEffect(() => console.log(match), [match]);

  return (
    <ContentTemplate>
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
        <div className="test">
          <Switch>
            <Route path={`${match.path}/label`} component={TaskBoard} />
            <Route path={`${match.path}/project`} component={TaskBoard} />
            <Route path={`${match.path}/today`} component={TaskBoard} />
          </Switch>
        </div>
      </div>
    </ContentTemplate>
  );
};

export default App;
