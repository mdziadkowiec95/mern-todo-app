import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = props => {
  return (
    <aside>
      <h2>Sidebar</h2>
      <ul>
        <li>
          <NavLink to="/app/label">Label</NavLink>
        </li>
        <li>
          <NavLink to="/app/project">Project</NavLink>
        </li>
        <li>
          <NavLink to="/app/today">Today</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
