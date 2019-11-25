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
import SearchFormContainer from '../../../containers/SerachFormContainer/SearchFormContainer'
import NavbarTemplate from '../../../templates/NavbarTemplate/NavbarTemplate'
import DropdownMenuItem from '../../atoms/DropdownMenuItem/DropdownMenuItem'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import config from '../../../config'

// eslint-disable-next-line no-unused-vars
const Navbar = ({ auth: { isAuth }, logoutUser, openSidebar, history }) => {
  const redirectToPath = path => {
    history.push(path)
  }
  return (
    <NavbarTemplate>
      <Container>
        {!isAuth && <NavLink to="/">iDO</NavLink>}
        <BurgerButton onClickFn={openSidebar} />
        <div className={styles.navItems}>
          <SearchFormContainer />
          <div className={styles.navActionIcons}>
            <DropdownMenu iconName="gear">
              <DropdownMenuItem
                iconName="gear"
                href="/preferences"
                onClickFn={() => redirectToPath('/preferences')}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem iconName="logout" href="/preferences" onClickFn={logoutUser}>
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
