import React, { useState, useRef } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import styles from './TaskCard.module.scss'
import cn from 'classnames'
import DatePicker from '../../atoms/DatePicker/DatePicker'
import { isValidDate } from '../../../utils/dates'
import { Link } from 'react-router-dom'
import Button from '../../atoms/Button/Button'
import TextField from '../../atoms/TextField/TextField'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import IconSVG from '../../atoms/IconSVG/IconSVG'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeTask } from '../../../store/tasks/async-actions'
import Chip from '../../atoms/Chip/Chip'
import MultiSelect from '../MultiSelect/MultiSelect'

const TaskCard = ({
  _id,
  priority,
  status,
  title,
  labels,
  project,
  date,
  removeTask,
  userLabels,
}) => {
  const INITIAL_EDIT_STATE = {
    updatedDate: date ? new Date(date) : null,
    updatedTitle: title,
    updatedLabels: labels,
  }
  const [isEditMode, setEditMode] = useState(false)
  const [editState, setEditState] = useState(INITIAL_EDIT_STATE)

  const { updatedDate, updatedTitle, updatedLabels } = editState

  const markAsDoneEl = useRef(null)

  const setDate = newDate => {
    setEditState({ ...editState, updatedDate: newDate })
  }

  const turnOnEditMode = e => {
    if (!markAsDoneEl.current.contains(e.target)) setEditMode(true)
  }

  const handleOnCancel = () => {
    setEditMode(false)
    setEditState(INITIAL_EDIT_STATE)
  }

  const handleEditField = e => {
    setEditState({
      ...editState,
      [e.target.name]: e.target.value,
    })
  }

  const handleLabelSelect = labelId => {
    const selectedLabel = userLabels.find(label => label._id === labelId)

    setEditState({
      ...editState,
      updatedLabels: [...updatedLabels, selectedLabel],
    })
  }

  const handleLabelRemove = labelId => {
    setEditState({
      ...editState,
      updatedLabels: updatedLabels.filter(label => label._id !== labelId),
    })
  }

  /** --- CSS classNames --- */
  const priorityFlagClassNames = cn(styles.priorityFlag, styles[priority])

  const MainWrapperClassName = cn(styles.card, {
    [styles.editMode]: isEditMode,
  })

  return (
    <>
      <div className={MainWrapperClassName}>
        <div role="presentation" onClick={turnOnEditMode}>
          <div className={styles.cardInner}>
            <div className={styles.cardHeader}>
              <div ref={markAsDoneEl} className={styles.cardDone}>
                <ButtonIcon
                  name="check"
                  maskContent
                  title="Mark as done"
                  onClickFn={() => removeTask(_id)}
                />
              </div>
              <div className={styles.cardContent}>
                {!isEditMode ? (
                  <h3>{title}</h3>
                ) : (
                  <TextField
                    name="updatedTitle"
                    inputValue={updatedTitle}
                    isSolid
                    onChangeFn={e => handleEditField(e)}
                    onBlurFn={e => handleEditField(e)}
                  />
                )}
                {!isEditMode && updatedDate && (
                  <>
                    <Moment format="dddd" date={updatedDate} />
                    <br />
                    <Moment format="MM-DD HH:mm" date={updatedDate} />
                  </>
                )}

                {project && (
                  <Link to={`/app/project/${project._id}/details`}>Project {project.name}</Link>
                )}
              </div>
              <div className={styles.cardActions}>
                <IconSVG name="flag" className={priorityFlagClassNames} size="20px" />
              </div>
            </div>
            <div>
              {!isEditMode &&
                labels.length > 0 &&
                labels.map(label => (
                  <Chip key={label._id} id={label._id} background={label.color} readonly small>
                    {label.name}
                  </Chip>
                ))}
              {isEditMode && (
                <MultiSelect
                  labels={{
                    add: 'Add labels:',
                    textOpen: 'Choose labels from the list',
                    allItemsSelected: 'All labels are selected',
                    noItemsAvailable: `You don't have any labels`,
                  }}
                  options={userLabels}
                  selectedOptions={updatedLabels}
                  onSelect={handleLabelSelect}
                  onRemove={handleLabelRemove}
                />
              )}
            </div>
          </div>
        </div>

        {isEditMode && (
          <div className={styles.editActions}>
            <Button primary>Update task</Button>
            <Button secondary onClickFn={handleOnCancel}>
              Cancel
            </Button>
            {isEditMode && (
              <DatePicker
                selectedDate={isValidDate(updatedDate) ? updatedDate : null}
                setDate={setDate}
                placeholder="Test"
                withIcon
                minDate={new Date()}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

TaskCard.propTypes = {
  _id: PropTypes.string.isRequired,
  priority: PropTypes.oneOf(['low', 'normal', 'high']),
  status: PropTypes.oneOf(['inbox', 'active']),
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ),
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),

  date: PropTypes.string,
}

TaskCard.defaultProps = {
  labels: [],
}

const mapStateToProps = ({ preferences: { labels } }) => ({
  userLabels: labels,
})

const mapDispatchToProps = dispatch => bindActionCreators({ removeTask }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard)
