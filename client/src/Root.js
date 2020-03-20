import React, { useEffect, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import NotificationListContainer from './containers/NotificationListContainer/NotificationListContainer'
import AuthRoute from './hoc/AuthRoute'
import RedirectAuthToApp from './hoc/RedirectAuthToApp'
import store from './store'
import { authenticateUser } from './store/auth/thunks'
import { setAuthTokenHeader } from './utils/API'
import LandingPage from './views/LandingPage/LandingPage'
import Preferences from './views/Preferences/Preferences'
import SignIn from './views/SignIn/SignIn'
import SignUp from './views/SignUp/SignUp'
import EmailConfirmation from './views/EmailConfirmation/EmailConfirmation'
import Loader from './components/atoms/Loader/Loader'

const authToken = localStorage.getItem('token')

if (authToken) {
  setAuthTokenHeader(authToken)
}

const LazyApp = React.lazy(() => import('./views/App/App'))

const Root = () => {
  useEffect(() => {
    store.dispatch(authenticateUser())
  }, [])

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <RedirectAuthToApp eaxct path="/" exact component={LandingPage} />
          <RedirectAuthToApp exact path="/sign-in" component={SignIn} />
          <RedirectAuthToApp exact path="/sign-up" component={SignUp} />
          <Route exact path="/email-confirmation/:token" component={EmailConfirmation} />
          <Suspense fallback={<Loader fullScreen inWrapper />}>
            <AuthRoute path="/app" component={LazyApp} />
          </Suspense>
          <NotificationListContainer />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default Root
