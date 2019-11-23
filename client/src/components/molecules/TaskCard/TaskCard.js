import React, { useState, useEffect } from 'react'
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

const TaskCard = ({ _id, priority, status, title, labels, project, date }) => {
  const [isEditMode, setEditMode] = useState(false)

  const [editState, setEditState] = useState({
    updatedDate: date ? new Date(date) : null,
    updatedTitle: title,
  })

  const { updatedDate, updatedTitle } = editState

  const setDate = newDate => {
    setEditState({ ...editState, updatedDate: newDate })
  }

  const handleOnCancel = () => {
    setEditMode(false)
    setEditState({
      updatedDate: date ? new Date(date) : null,
      updatedTitle: title,
    })
  }

  const handleEditField = e => {
    setEditState({
      ...editState,
      [e.target.name]: e.target.value,
    })
  }

  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log(new Date(taskDate))
  // }, [taskDate])

  const priorityFlagClassNames = cn(styles.priorityFlag, styles[priority])

  return (
    <>
      <div
        className={cn(styles.card, {
          [styles.editMode]: isEditMode,
        })}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardDone}>
            <ButtonIcon name="check" maskContent title="Mark as done" />
          </div>
          <div className={styles.cardContent} role="presentation" onClick={() => setEditMode(true)}>
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
            {date && (
              <>
                <Moment format="dddd" date={date} />
                <br />
                <Moment format="MM-DD HH:mm" date={date} />
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

export default TaskCard
