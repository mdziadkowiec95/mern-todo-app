import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DatePickerComponent from 'react-datepicker'
import { isTwelweHoursCountry } from '../../../utils/dates'
import { debounce } from 'lodash'

import 'react-datepicker/dist/react-datepicker.css'

// DatePicker styles overrides
import './DatePicker.scss'
import config from '../../../config'

const DatePicker = ({ selectedDate, setDate, placeholder }) => {
  const [showAsModal, setShowAsModal] = useState(false)

  useEffect(() => {
    ;['load', 'resize'].forEach(event => {
      window.addEventListener(
        event,
        debounce(() => {
          if (window.innerWidth >= config.breakpoints.xs) {
            setShowAsModal(false)
          } else {
            setShowAsModal(true)
          }
        }, 500),
      )
    })
  }, [])
  const timeFormat = isTwelweHoursCountry() ? 'h:mm aa' : 'HH:mm'

  return (
    <DatePickerComponent
      selected={selectedDate}
      onChange={date => setDate(date)}
      placeholderText={placeholder}
      showTimeSelect
      timeFormat={timeFormat}
      isClearable
      timeIntervals={15}
      timeCaption="time"
      dateFormat={`yyyy/MM/dd ${timeFormat}`}
      withPortal={showAsModal}
    />
  )
}

DatePicker.propTypes = {
  selectedDate: PropTypes.object,
  setDate: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

DatePicker.defaultProps = {
  selectedDate: null,
  placeholder: 'Select a date',
}

export default DatePicker
