import React, { useState, useEffect, Component } from 'react'
import PropTypes from 'prop-types'
import DatePickerComponent from 'react-datepicker'
import Moment from 'react-moment'
import { isTwelweHoursCountry } from '../../../utils/dates'
import { debounce } from 'lodash'

import 'react-datepicker/dist/react-datepicker.css'

// DatePicker styles overrides
import './DatePicker.scss'
import config from '../../../config'
import ButtonIcon from '../ButtonIcon/ButtonIcon'

// It has to be a class component (react-datepicker library requirement)
class CalendarButton extends Component {
  render() {
    const { value, onClick } = this.props

    return (
      <div className="react-datepicker__btn-wrap">
        <ButtonIcon title="Select date" reversed name="calendar" onClickFn={onClick} />
        {value && (
          <div className="react-datepicker__date-text">
            <Moment format="dddd" date={new Date(value)} />
            <br />
            <Moment format="MM-DD, HH:mm" date={new Date(value)} />
          </div>
        )}
      </div>
    )
  }
}

CalendarButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
}

const DatePicker = ({ selectedDate, setDate, placeholder, withIcon, minDate }) => {
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
      timeIntervals={15}
      timeCaption="time"
      minDate={minDate}
      dateFormat={`yyyy/MM/dd ${timeFormat}`}
      withPortal={showAsModal}
      customInput={withIcon ? <CalendarButton /> : null}
    />
  )
}

DatePicker.propTypes = {
  selectedDate: PropTypes.object,
  setDate: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  withIcon: PropTypes.bool,
  minDate: PropTypes.object,
}

DatePicker.defaultProps = {
  selectedDate: null,
  placeholder: 'Select a date',
  withIcon: false,
  minDate: null,
}

export default DatePicker
