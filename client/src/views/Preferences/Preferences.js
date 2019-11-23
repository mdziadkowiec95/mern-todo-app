import React from 'react'
import { NavLink } from 'react-router-dom'
import MainTemplate from '../../templates/MainTemplate/MainTemplate'
import NavbarTemplate from '../../templates/NavbarTemplate/NavbarTemplate'

const Preferences = () => {
  return (
    <MainTemplate>
      <NavbarTemplate>
        <NavLink to="/app">Back to App</NavLink>
      </NavbarTemplate>
      <h2>Preferences View</h2>
    </MainTemplate>
  )
}

export default Preferences
