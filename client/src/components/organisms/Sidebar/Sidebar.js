import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.scss'

const Sidebar = () => {
  return (
    <aside className={styles.wrapper}>
      <h2>Sidebar</h2>
      <ul>
        <li>
          <NavLink to="/app/label/123">Label</NavLink>
        </li>
        <li>
          <NavLink to="/app/project/123">Project</NavLink>
        </li>
        <li>
          <NavLink to="/app/today">Today</NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
