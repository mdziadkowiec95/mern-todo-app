import React, { useState, useRef } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import styles from './TaskCard.module.scss'
import cn from 'classnames'
import DatePicker from '../../atoms/DatePicker/DatePicker'
import { isValidDate } from '../../../utils/dates'
import { Link, withRouter, Redirect } from 'react-router-dom'
import Button from '../../atoms/Button/Button'
import TextField from '../../atoms/TextField/TextField'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import IconSVG from '../../atoms/IconSVG/IconSVG'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { bindActionCreators } from 'redux'
import { removeTask, updateTask } from '../../../store/tasks/async-actions'
import Chip from '../../atoms/Chip/Chip'
import MultiSelect from '../MultiSelect/MultiSelect'
import SelectDropdown from '../../atoms/SelectDropdown/SelectDropdown'
import { LabelOrProjectType, PriorityType } from '../../../propTypes'
import PriorityFlag from '../../atoms/PriorityFlag/PriorityFlag'
import PriorityPicker from '../PriorityPicker/PriorityPicker'

const TaskCard = ({
  history,
  _id,
  priority,
  status,
  title,
  labels,
  project,
  date,
  userLabels,
  userProjects,
  updateTask,
  removeTask,
}) => {
  const INITIAL_EDIT_STATE = {
    updatedDate: date ? new Date(date) : null,
    updatedTitle: title,
    updatedProject: project,
    updatedLabels: labels,
    updatedPriority: priority,
  }
  const [isEditMode, setEditMode] = useState(false)
  const [editState, setEditState] = useState(INITIAL_EDIT_STATE)
  const [inboxRedirect, turnOnInboxRedirect] = useState(false)

  const { updatedDate, updatedTitle, updatedProject, updatedLabels, updatedPriority } = editState

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

  const handleProjectChange = e => {
    const selectedProject = userProjects.find(project => project._id === e.target.value)

    setEditState({
      ...editState,
      updatedProject: selectedProject,
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

  const handleUpdateProject = async () => {
    const taskPayload = {
      taskId: _id, // Necessary for update request
    }

    const labelsIDs = updatedLabels.map(l => l._id)
    const areLabelsModified =
      labelsIDs.length !== labels.length ||
      labelsIDs.some((labelId, i) => labelId !== labels[i]._id)

    const isNewDateDifferent = new Date(date).getTime() !== new Date(updatedDate).getTime()

    if (areLabelsModified) taskPayload.labelsIDs = labelsIDs
    if (title !== updatedTitle) taskPayload.title = updatedTitle
    if (isNewDateDifferent) taskPayload.date = updatedDate
    if (updatedProject) taskPayload.projectId = updatedProject._id
    if (priority !== updatedPriority) taskPayload.priority = updatedPriority

    await updateTask(_id, taskPayload)
    setEditMode(false)

    if (isNewDateDifferent) turnOnInboxRedirect(true)
  }

  /** --- CSS classNames --- */

  const MainWrapperClassName = cn(styles.card, {
    [styles.editMode]: isEditMode,
  })

  // if (inboxRedirect) return <Redirect to={{ pathname: '/app/inbox', state: { taskId: _id } }} />

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

                {!isEditMode && project && (
                  <p>
                    Project: <Link to={`/app/project/${project._id}/details`}>{project.name}</Link>
                  </p>
                )}
              </div>
              <div className={styles.cardActions}>
                {/* <PriorityFlag priority={priority} /> */}
                <PriorityPicker
                  onSelect={pr =>
                    setEditState({
                      ...editState,
                      updatedPriority: pr,
                    })
                  }
                  selectedPriority={updatedPriority}
                  allowEdit={isEditMode}
                />
              </div>
            </div>
            <div>
              {isEditMode && (
                <>
                  <label htmlFor="updatedProject">Assigned project: </label>
                  <SelectDropdown
                    defaultOption="--- No project assigned ---"
                    selectedValue={updatedProject ? updatedProject._id : ''}
                    options={userProjects}
                    name="updatedProject"
                    onChange={handleProjectChange}
                    onBlur={handleProjectChange}
                  />
                </>
              )}
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
            <Button primary onClickFn={handleUpdateProject}>
              Update task
            </Button>
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
  history: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
  priority: PriorityType,
  status: PropTypes.oneOf(['inbox', 'active']),
  title: PropTypes.string.isRequired,
  userLabels: PropTypes.arrayOf(LabelOrProjectType),
  userProjects: PropTypes.arrayOf(LabelOrProjectType),
  labels: PropTypes.arrayOf(LabelOrProjectType),
  project: LabelOrProjectType,
  date: PropTypes.string,
}

TaskCard.defaultProps = {
  labels: [],
}

const mapStateToProps = ({ preferences: { labels, projects } }) => ({
  userLabels: labels,
  userProjects: projects,
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateTask, removeTask }, dispatch)

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(TaskCard)
