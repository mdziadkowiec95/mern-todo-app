import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Preferences from './views/Preferences/Preferences';
import App from './views/App/App';

const Root: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app" />} />
          <Route path="/app" component={App} />
          <Route path="/preferences" component={Preferences} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Root;
