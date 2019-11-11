import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Preferences from './views/Preferences/Preferences';
import App from './views/App/App';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import LandingPage from './views/App/LandingPage/LandingPage';
import Navbar from './components/organisms/Navbar/Navbar';
import NotificaitonListContainer from './containers/NotificaitonListContainer/NotificaitonListContainer';

const Root: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/app" component={App} />
            <Route path="/preferences" component={Preferences} />
          </Switch>
          <NotificaitonListContainer />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default Root;
