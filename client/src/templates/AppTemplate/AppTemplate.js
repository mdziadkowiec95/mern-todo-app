import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleAddTaskModal } from '../../store/ui/actions'
import styles from './AppTemplate.module.scss'
import Navbar from '../../components/organisms/Navbar/Navbar'
import Container from '../Container/Container'
import MainTemplate from '../MainTemplate/MainTemplate'
import ButtonIcon from '../../components/atoms/ButtonIcon/ButtonIcon'
import AddTaskModal from '../../components/molecules/AddTaskModal/AddTaskModal'
import config from '../../config'
import UploadStatusContainer from '../../containers/UploadStatusContainer/UploadStatusContainer'

const AppTemplate = ({ isAddTaskModalOpen, toggleAddTaskModal, children }) => {
  return (
    <MainTemplate>
      <Navbar />
      <Container>{children}</Container>
      <div className={styles.addTaskBtn}>
        <ButtonIcon
          name="plusBackground"
          size="big"
          solid
          title="Add task"
          color={config.colors.accent}
          onClickFn={() => toggleAddTaskModal(isAddTaskModalOpen)}
        />
        {isAddTaskModalOpen && <AddTaskModal />}
      </div>
      <UploadStatusContainer />
    </MainTemplate>
  )
}

AppTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  isAddTaskModalOpen: PropTypes.bool.isRequired,
  toggleAddTaskModal: PropTypes.func.isRequired,
}

AppTemplate.defaultProps = {
  isAddTaskModalOpen: false,
}

const mapStateToProps = ({ ui }) => ({
  isAddTaskModalOpen: ui.isAddTaskModalOpen,
})

const mapDispatchToProps = dispatch => ({
  toggleAddTaskModal: isOpen => dispatch(toggleAddTaskModal(!isOpen)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppTemplate)
