import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './TaskList.module.scss'
import cn from 'classnames'
import Moment from 'react-moment'
import TaskCard from '../TaskCard/TaskCard'
import config from '../../../config'
import Loader from '../../atoms/Loader/Loader'
import WeekdayDate from '../../atoms/WeekdayDate/WeekdayDate'

const addDaysToDate = (dayCount = 0, startingDate = new Date()) => {
  const dayAfterDayCount = new Date(startingDate.getTime() + dayCount * 24 * 60 * 60 * 1000)
  return dayAfterDayCount
}

const getDateStart = (date = new Date()) => {
  date.setHours(0, 0, 0, 0)
  return date
}

const getDateEnd = (date = new Date()) => {
  date.setHours(23, 59, 59, 0)
  return date
}

const generateSevenDaysData = () => {
  const days = []
  for (let i = 0; i < 7; i++) {
    const dayObj = {
      startDate: getDateStart(addDaysToDate(i)),
      endDate: getDateEnd(addDaysToDate(i)),
      tasks: [],
    }
    days.push(dayObj)
  }
  return days
}

const TaskListTemplate = ({ tasks, pageType, isLoading }) => {
  const [sortedTasks, setSortedTasks] = useState([])

  const sortTasksForSevenDays = tasks => {
    const sevenDaysData = generateSevenDaysData()

    tasks.forEach(task => {
      const taskDate = new Date(task.date)

      sevenDaysData.some(day => {
        const isTaskInRange = day.startDate < taskDate && taskDate < day.endDate
        if (!isTaskInRange) return false

        day.tasks.push(task)
        return true
      })
    })

    setSortedTasks(sevenDaysData)
  }

  useEffect(() => {
    if (pageType === 'next-week') {
      sortTasksForSevenDays(tasks)
    }
  }, [pageType, tasks])

  const ListWrapperClassName = cn(styles.listWrapper, {
    [styles.isLoading]: isLoading,
  })

  const getDayNameReplacement = dayIndex => {
    if (dayIndex === 0) {
      return 'Today'
    } else if (dayIndex === 1) {
      return 'Tomorrow'
    }
    return false
  }

  return (
    <div className={styles.wrapper}>
      {pageType === 'next-week' &&
        sortedTasks.length > 0 &&
        sortedTasks.map((day, dayIndex) => (
          <div key={`weekday-${dayIndex}`}>
            {day.tasks && day.tasks.length > 0 ? (
              <ul className={ListWrapperClassName}>
                {isLoading && <Loader isLarge inWrapper absoluteCenter />}
                <WeekdayDate
                  date={day.startDate}
                  replaceDayName={getDayNameReplacement(dayIndex)}
                />
                {day.tasks.map(task => (
                  <li key={task._id}>
                    <TaskCard {...task} />
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <WeekdayDate
                  date={day.startDate}
                  replaceDayName={getDayNameReplacement(dayIndex)}
                />
                <p className={styles.noTasksText}>No tasks assigned</p>
              </>
            )}
          </div>
        ))}
      {pageType !== 'next-week' && (
        <ul className={ListWrapperClassName}>
          {isLoading && <Loader isLarge inWrapper absoluteCenter />}
          {tasks && tasks.length > 0 ? (
            tasks.map(task => (
              <li key={task._id}>
                <TaskCard {...task} />
              </li>
            ))
          ) : (
            <h3>No tasks planned yet</h3>
          )}
        </ul>
      )}
    </div>
  )
}

TaskListTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  tasks: PropTypes.array,
  pageType: PropTypes.oneOf(config.pageTypes),
}

export default TaskListTemplate
