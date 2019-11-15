import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { authenticateUser } from './store/auth/thunks';
import RedirectAuthToApp from './hoc/RedirectAuthToApp';
import AuthRoute from './hoc/AuthRoute';
import Preferences from './views/Preferences/Preferences';
import App from './views/App/App';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import NotificaitonListContainer from './containers/NotificaitonListContainer/NotificaitonListContainer';
import LandingPage from './views/App/LandingPage/LandingPage';
// import Navbar from './components/organisms/Navbar/Navbar';
import { setAuthTokenHeader } from './utils/API';

const authToken: string | null = localStorage.getItem('token');

if (authToken) {
  setAuthTokenHeader(authToken);
}

const Root: React.FC = () => {
  // Need to fix this any type (do more research about typing Redux...)
  // I've put any as a workaround for typing problem
  useEffect(() => {
    store.dispatch<any>(authenticateUser());
  }, []);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          {/* <Navbar /> */}
          <Switch>
            <RedirectAuthToApp path="/" exact component={LandingPage} />
            <RedirectAuthToApp path="/sign-in" component={SignIn} />
            <RedirectAuthToApp path="/sign-up" component={SignUp} />
            <AuthRoute path="/app" component={App} />
            <AuthRoute path="/preferences" component={Preferences} />
          </Switch>
          <NotificaitonListContainer />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default Root;
