import React from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store/rootReducer';
import { logoutUser } from '../../../store/auth/actions';

type TNavbarProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Navbar: React.FC<TNavbarProps> = ({ auth: { isAuth }, logoutUser }) => {
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
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ logoutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
