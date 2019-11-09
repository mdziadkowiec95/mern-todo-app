import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Preferences from './views/Preferences/Preferences';
import App from './views/App/App';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import LandingPage from './views/App/LandingPage/LandingPage';

const Root: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/app" component={App} />
          <Route path="/preferences" component={Preferences} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Root;
