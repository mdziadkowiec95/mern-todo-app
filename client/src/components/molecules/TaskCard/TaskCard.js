import React, { useState, useEffect } from 'react'
import styles from './TaskCard.module.scss'
import DatePicker from '../../atoms/DatePicker/DatePicker'
import { isValidDate } from '../../../utils/dates'
import { Link } from 'react-router-dom'

const TaskCard = () => {
  const [taskData, setTaskData] = useState({
    date: null,
  })

  const { date } = taskData

  const setDate = newDate => {
    setTaskData({ ...taskData, date: newDate })
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(taskData)
  })

  return (
    <div className={styles.card}>
      <h2>Task Card</h2>
      <DatePicker
        selectedDate={isValidDate(date) ? date : null}
        setDate={setDate}
        placeholder="Test"
      />
      <br />
      <Link to={`/app/project/${345}/details`}>Preview project 345</Link>
      <br />
      <Link to={`/app/project/${678}/details`}>Preview project 678</Link>
    </div>
  )
}

export default TaskCard
