import React, { useState } from 'react'
import styles from './ManageLabelsModal.module.scss'
import { connect } from 'react-redux'
import Chip from '../../atoms/Chip/Chip'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import AddLabelModal from '../AddLabelModal/AddLabelModal'

const initialLabelState = {
  _id: '',
  name: '',
  color: '',
}

const ManageLabelsModal = ({ userLabels }) => {
  const [isEditMode, toggleEditMode] = useState(true)

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

  const LabelsList = () => (
    <>
      <ButtonIcon name="plus" onClickFn={handleAddNewLabel} />
      <ul>
        {userLabels.length > 0 &&
          userLabels.map(label => (
            <li key={label._id} className={styles.labelWrap}>
              <Chip background={label.color} readonly>
                {label.name}
              </Chip>
              <ButtonIcon name="edit" size="tiny" onClickFn={() => handleEditLabel(label)} />
            </li>
          ))}
      </ul>
    </>
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <ButtonIcon name="closeBorder" className={styles.closeBtn} />
        {isEditMode ? (
          <AddLabelModal existingLabel={existingLabel} onCancel={handleEditCancel} />
        ) : (
          <LabelsList />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ preferences }) => ({
  userLabels: preferences.labels,
})

export default connect(mapStateToProps)(ManageLabelsModal)
