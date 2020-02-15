import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import styles from './WeekdayDate.module.scss'

const WeekdayDate = ({ date, replaceDayName }) => {
  const DateWithRaplecement = (
    <div className={styles.wrapper}>
      <span>{replaceDayName} </span>
      <span className={styles.date}>
        <Moment format="DD-MM" date={date} />
      </span>
    </div>
  )

  const StandardDate = (
    <div className={styles.wrapper}>
      <Moment format="dddd" date={date} />{' '}
      <span className={styles.date}>
        <Moment format="DD-MM" date={date} />
      </span>
    </div>
  )

  return replaceDayName ? DateWithRaplecement : StandardDate
}

WeekdayDate.propTypes = {
  date: PropTypes.object.isRequired,
  replaceDayName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

WeekdayDate.defaultProps = {
  replaceDayName: '',
}

export default WeekdayDate
