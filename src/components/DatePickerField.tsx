import React from 'react';
import { Controller, Control } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, FormLabel, Text } from '@chakra-ui/react';

interface DatePickerFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  dateFormat?: string;
  placeholderText?: string;
  isClearable?: boolean;
  maxDate?: Date;
  showTimeSelect?: boolean;
  maxTime?: Date;
  timeFormat?: string;
  timeIntervals?: number;
  timeCaption?: string;
  minDate?: Date;
  minTime?: Date;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  control,
  name,
  label,
  selectedDate,
  setSelectedDate,
  dateFormat = "MM/dd/yyyy",
  placeholderText = "Selecione uma data",
  isClearable = true,
  maxDate,
  showTimeSelect = false,
  maxTime,
  timeFormat = "HH:mm",
  timeIntervals,
  timeCaption,
  minDate,
  minTime,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState: { error } }) => (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <DatePicker
          id={name}
          selected={selectedDate}
          onChange={(date) => {
            field.onChange(date);
            setSelectedDate(date);
          }}
          dateFormat={dateFormat}
          placeholderText={placeholderText}
          isClearable={isClearable}
          maxDate={maxDate}
          showTimeSelect={showTimeSelect}
          maxTime={maxTime}
          timeFormat={timeFormat}
          timeIntervals={timeIntervals}
          timeCaption={timeCaption}
          minDate={minDate}
          minTime={minTime}
        />
        {error && <Text color="red.500">{error.message}</Text>}
      </FormControl>
    )}
  />
);

export default DatePickerField;