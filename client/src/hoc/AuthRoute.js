import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loader from '../components/atoms/Loader/Loader'

const AuthRoute = ({ component: Component, auth: { isAuth, isLoading }, ...rest }) => {
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
        return !isAuth && !isLoading ? <Redirect to="/" /> : <Component {...props} />
      }}
    />
  )
}

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(AuthRoute)
