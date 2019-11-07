import React from 'react';
import DatePickerComponent from 'react-datepicker';
import { isTwelweHoursCountry } from '../../../utils/dates';

import 'react-datepicker/dist/react-datepicker.css';

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
    />
  );
};

export default DatePicker;
