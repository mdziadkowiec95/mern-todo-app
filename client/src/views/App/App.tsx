import React, { useEffect } from 'react';
import Navbar from '../../components/organisms/Navbar/Navbar';
import Sidebar from '../../components/organisms/Sidebar/Sidebar';
import styles from './App.module.scss';
import { Switch, Route, RouteComponentProps } from 'react-router';
import TaskBoard from './TaskBoard/TaskBoard';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import axios from 'axios';

const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWRjNDY2YzM3MjcwY2EzOTZkODU4MjNkIn0sImlhdCI6MTU3MzE1MjQ1MSwiZXhwIjoxNTczMTk1NjUxfQ.-Sla62AGQ0B4aEpO0wlwsSTCaY66SQYWP_IeaQBtrSk';

localStorage.setItem('token', authToken);

const App: React.FC<RouteComponentProps> = ({ match, children }) => {
  useEffect(() => {
    axios
      .post('/api/auth', {
        email: 'client@test.pl',
        password: '123123123',
        passwordConfirm: '123123123',
        name: 'Client Test'
      })
      .then(res => console.log(res));
  }, []);

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
