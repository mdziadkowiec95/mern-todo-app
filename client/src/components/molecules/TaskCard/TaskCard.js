import React, { useState, useEffect } from 'react'
import styles from './TaskCard.module.scss'
import DatePicker from '../../atoms/DatePicker/DatePicker'
import { isValidDate } from '../../../utils/dates'
import { Link } from 'react-router-dom'

const TaskCard = ({ date, project }) => {
  const [state, setTaskState] = useState({
    taskDate: date ? new Date(date) : null,
  })

  const { taskDate } = state

  const setDate = newDate => {
    setTaskState({ ...state, taskDate: newDate })
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(new Date(taskDate))
  }, [taskDate])

  return (
    <div className={styles.card}>
      <h2>Task Card</h2>
      <DatePicker
        selectedDate={isValidDate(taskDate) ? taskDate : null}
        setDate={setDate}
        placeholder="Test"
      />
      <br />
      {project && <Link to={`/app/project/${project._id}/details`}>Project {project.name}</Link>}
    </div>
  )
}

export default TaskCard
