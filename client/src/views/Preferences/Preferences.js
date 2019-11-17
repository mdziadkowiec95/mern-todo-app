import React from 'react'
import { NavLink } from 'react-router-dom'
import MainTemplate from '../../templates/MainTemplate/MainTemplate'

const Preferences = () => {
  return (
    <MainTemplate>
      <NavLink to="/app">Close</NavLink>
      <h2>Preferences View</h2>
    </MainTemplate>
  )
}

export default Preferences
