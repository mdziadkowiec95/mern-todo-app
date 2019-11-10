import React, { useState, useEffect } from 'react';
import DatePickerComponent from 'react-datepicker';
import { isTwelweHoursCountry } from '../../../utils/dates';
import { debounce } from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
// DatePicker styles overrides
import './DatePicker.scss';

interface DatePickerProps {
  selectedDate: Date | null;
  setDate: Function;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  setDate,
  placeholder
}) => {
  const [showAsModal, setShowAsModal] = useState(false);

  useEffect(() => {
    ['load', 'resize'].forEach(event => {
      window.addEventListener(
        event,
        debounce(() => {
          if (window.innerWidth >= 576) {
            setShowAsModal(false);
          } else {
            setShowAsModal(true);
          }
        }, 500)
      );
    });
  }, []);
  const timeFormat = isTwelweHoursCountry() ? 'h:mm aa' : 'HH:mm';

  return (
    <DatePickerComponent
      selected={selectedDate}
      onChange={(date: Date) => setDate(date)}
      placeholderText={placeholder ? placeholder : 'Select a date'}
      showTimeSelect
      timeFormat={timeFormat}
      isClearable
      timeIntervals={15}
      timeCaption="time"
      dateFormat={`yyyy/MM/dd ${timeFormat}`}
      withPortal={showAsModal}
    />
  );
};

export default DatePicker;
