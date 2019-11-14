import React, { useEffect } from 'react';
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
import { setAuthTokenHeader } from './utils/API';
import { authenticateUser } from './store/auth/thunks';
import RedirectAuthToApp from './hoc/RedirectAuthToApp';

const authToken: string | null = localStorage.getItem('token');

if (authToken) {
  setAuthTokenHeader(authToken);
}

const Root: React.FC = () => {
  // Need to fix typing (do more research about typing Redux...)
  useEffect(() => {
    // @ts-ignore
    store.dispatch(dispatch => {
      dispatch(authenticateUser());
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <RedirectAuthToApp path="/" exact component={LandingPage} />
            <RedirectAuthToApp path="/sign-in" component={SignIn} />
            <RedirectAuthToApp path="/sign-up" component={SignUp} />
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
