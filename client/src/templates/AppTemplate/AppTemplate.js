import React from 'react'
import Navbar from '../../components/organisms/Navbar/Navbar'
import Container from '../Container/Container'
import MainTemplate from '../MainTemplate/MainTemplate'
import PropTypes from 'prop-types'

const AppTemplate = ({ children }) => (
  <MainTemplate>
    <Container>
      <Navbar />
      {children}
    </Container>
  </MainTemplate>
)

AppTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppTemplate
