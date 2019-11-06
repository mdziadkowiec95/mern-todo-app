import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar: React.FC = props => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/preferences">Preferences</NavLink>
        </li>
      </ul>
      <hr />
    </nav>
  );
};

export default Navbar;
