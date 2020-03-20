import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { logoutUser } from '../../../store/auth/actions'
import styles from './Navbar.module.scss'
import Container from '../../../templates/Container/Container'
import BurgerButton from '../../atoms/BurgerButton/BurgerButton'
import DropdownMenu from '../../molecules/DropdownMenu/DropdownMenu'
import { toggleSidebar } from '../../../store/ui/actions'
import NavbarTemplate from '../../../templates/NavbarTemplate/NavbarTemplate'
import DropdownMenuItem from '../../atoms/DropdownMenuItem/DropdownMenuItem'
import SearchFormContainer from '../../../containers/SerachFormContainer/SearchFormContainer';

const Navbar = ({ auth: { isAuth, user }, logoutUser, openSidebar }) => {
  // const redirectToPath = path => {
  //   history.push(path)
  // }
  return (
    <NavbarTemplate>
      <Container>
        {!isAuth && <NavLink to="/">iDO</NavLink>}
        <BurgerButton onClick={openSidebar} />
        <div className={styles.navItems}>
          {/* Hide Serach task from - (it is going to be implemented in the future) */}
          <SearchFormContainer />
          <div className={styles.navActionIcons}>
            <DropdownMenu iconName="gear">
              <p className="text-center">
                <strong>Logged as:</strong>
                <br />
                {user && user.name}
              </p>
              {/* Hide settings button - it is going to be implemented in the future */}
              {/* <DropdownMenuItem
                iconName="gear"
                href="/app/preferences"
                onClickFn={() => redirectToPath('/app/preferences')}
              >
                Settings
              </DropdownMenuItem> */}
              <DropdownMenuItem iconName="logout" onClickFn={logoutUser}>
                Logout
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </NavbarTemplate>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  openSidebar: () => dispatch(toggleSidebar(true)),
})

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navbar)
