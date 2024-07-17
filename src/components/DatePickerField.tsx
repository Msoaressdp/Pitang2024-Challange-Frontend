import React from 'react';
import { Controller, Control } from 'react-hook-form';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, FormLabel, Text } from '@chakra-ui/react';

interface DatePickerFieldProps extends Omit<ReactDatePickerProps, 'name'> {
  control: Control<any>;
  name: string;
  label: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  control,
  name,
  label,
  selectedDate,
  setSelectedDate,
  ...props
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
          {...props}
        />
        {error && <Text color="red.500">{error.message}</Text>}
      </FormControl>
    )}
  />
);

export default DatePickerField;