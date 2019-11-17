import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logoutUser } from '../../../store/auth/actions'

// eslint-disable-next-line no-unused-vars
const Navbar = ({ auth: { isAuth }, logoutUser }) => {
  return (
    <nav>
      <NavLink to="/">iDO</NavLink>
      <ul>
        <li>
          <NavLink to="/preferences">Preferences</NavLink>
        </li>
        <li>
          <button onClick={logoutUser}>Log out</button>
        </li>
      </ul>
    </nav>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => bindActionCreators({ logoutUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
