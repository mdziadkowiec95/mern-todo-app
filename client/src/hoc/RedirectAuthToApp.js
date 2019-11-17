import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import Loader from '../components/atoms/Loader/Loader'

const RedirectAuthToApp = ({ component: Component, auth: { isAuth, isLoading }, ...rest }) => {
  const [loadView, setLoadView] = useState(false)

  useEffect(() => {
    if (loadView === false && !isLoading) {
      setLoadView(true)
    }
  }, [isLoading, loadView])

  return (
    <Route
      {...rest}
      render={props => {
        if (!loadView) {
          return <Loader fullScreen />
        }

        return isAuth ? <Redirect to="/app" /> : <Component {...props} />
      }}
    />
  )
}

RedirectAuthToApp.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(RedirectAuthToApp)
