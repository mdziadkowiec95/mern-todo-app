import React, { useState } from 'react'
import styles from './ManageLabelsModal.module.scss'
import { connect } from 'react-redux'
import Chip from '../../atoms/Chip/Chip'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import AddLabelModal from '../AddLabelModal/AddLabelModal'
import { removeLabel } from '../../../store/preferences/async-actions'
import { bindActionCreators } from 'redux'
import Loader from '../../atoms/Loader/Loader'
import cn from 'classnames'
import { toggleManageLabelsModal } from '../../../store/ui/actions'
import Heading from '../../atoms/Heading/Heading'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import Modal from '../../../portals/Modal'

const initialLabelState = {
  _id: '',
  name: '',
  color: '',
}

const ManageLabelsModal = ({ userLabels, isLoading, removeLabel, toggleManageLabelsModal }) => {
  const [isEditMode, toggleEditMode] = useState(false)
  const [isConfirmModalOpen, toggleConfirmModal] = useState(false)
  const [labelToRemove, setLabelToRemove] = useState(null)
  const [existingLabel, setExistingLabel] = useState(initialLabelState)

  const handleEditCancel = () => {
    toggleEditMode(false)
    setExistingLabel(initialLabelState)
  }

  const handleAddNewLabel = () => {
    toggleEditMode(true)
  }

  const handleEditLabel = label => {
    toggleEditMode(true)
    setExistingLabel({ ...label })
  }

  // Show confirm modal when user clicks remove button to ensure he is aware what are the consequences
  const initRemoveLabel = labelId => {
    toggleConfirmModal(true)
    setLabelToRemove(labelId)
  }

  const handleRemoveCancel = () => {
    toggleConfirmModal(false)
    setLabelToRemove(null)
  }

  const handleRemoveLabelConfirm = async labelId => {
    await removeLabel(labelId)
    toggleConfirmModal(false)
  }

  const LabelsList = (
    <>
      <div className={styles.addBtnWrap}>
        <ButtonIcon name="plus" onClickFn={handleAddNewLabel} title="Add new label" />
      </div>
      <ul>
        {userLabels.length > 0 &&
          userLabels.map(label => (
            <li key={label._id} className={styles.labelWrap}>
              <Chip background={label.color} readonly fullWidth>
                {label.name}
              </Chip>
              <ButtonIcon
                name="minusBorder"
                size="tiny"
                onClickFn={() => initRemoveLabel(label._id)}
                title="Remove label"
              />
              <ButtonIcon
                name="edit"
                size="tiny"
                onClickFn={() => handleEditLabel(label)}
                title="Edit label"
              />
            </li>
          ))}
      </ul>
    </>
  )

  const WrapperClassName = cn(styles.wrapper, {
    [styles.isLoading]: isLoading,
  })

  return (
    <div>
      {isConfirmModalOpen && labelToRemove && (
        <Modal>
          <ConfirmModal
            descriptionText="Label will be removed also from all tasks in which it occurs."
            onConfirm={() => handleRemoveLabelConfirm(labelToRemove)}
            onCancel={handleRemoveCancel}
          />
        </Modal>
      )}
      <div className={WrapperClassName}>
        <div className={styles.inner}>
          {isLoading && <Loader absoluteCenter />}
          <Heading tagSize="3" center primary>
            Edit labels
          </Heading>
          <ButtonIcon
            name="closeBg"
            className={styles.closeBtn}
            onClickFn={() => toggleManageLabelsModal(false)}
          />
          {isEditMode ? (
            <AddLabelModal existingLabel={existingLabel} onCancel={handleEditCancel} />
          ) : (
            LabelsList
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ preferences }) => ({
  userLabels: preferences.labels,
  isLoading: preferences.isLoading,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleManageLabelsModal, removeLabel }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ManageLabelsModal)
