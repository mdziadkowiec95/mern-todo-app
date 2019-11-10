import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = props => {
  return (
    <nav>
      <NavLink to="/">iDO</NavLink>
      <ul>
        <li>
          <NavLink to="/preferences">Preferences</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
