import React from 'react'
import PropTypes from 'prop-types'
import styles from './AppTemplate.module.scss'
import Navbar from '../../components/organisms/Navbar/Navbar'
import Container from '../Container/Container'
import MainTemplate from '../MainTemplate/MainTemplate'
import ButtonIcon from '../../components/atoms/ButtonIcon/ButtonIcon'

const AppTemplate = ({ children }) => (
  <MainTemplate>
    <Navbar />
    <Container>{children}</Container>
    <div className={styles.addTaskBtn}>
      <ButtonIcon name="plusBackground" size="big" reversed title="Add task" />
    </div>
  </MainTemplate>
)

AppTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppTemplate
