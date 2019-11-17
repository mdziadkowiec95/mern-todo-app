import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import NotificationListContainer from './containers/NotificationListContainer/NotificationListContainer'
import AuthRoute from './hoc/AuthRoute'
import RedirectAuthToApp from './hoc/RedirectAuthToApp'
import store from './store'
import { authenticateUser } from './store/auth/thunks'
import { setAuthTokenHeader } from './utils/API'
import App from './views/App/App'
import LandingPage from './views/App/LandingPage/LandingPage'
import Preferences from './views/Preferences/Preferences'
import SignIn from './views/SignIn/SignIn'
import SignUp from './views/SignUp/SignUp'

const authToken = localStorage.getItem('token')

if (authToken) {
  setAuthTokenHeader(authToken)
}

const Root = () => {
  useEffect(() => {
    store.dispatch(authenticateUser())
  }, [])

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <RedirectAuthToApp path="/" exact component={LandingPage} />
            <RedirectAuthToApp path="/sign-in" component={SignIn} />
            <RedirectAuthToApp path="/sign-up" component={SignUp} />
            <AuthRoute path="/app" component={App} />
            <AuthRoute path="/preferences" component={Preferences} />
          </Switch>
          <NotificationListContainer />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default Root
