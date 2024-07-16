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
  isInvalid: boolean;
  errors: { message?: string };
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  control,
  name,
  label,
  selectedDate,
  setSelectedDate,
  isInvalid,
  errors,
  ...props
}) => (
  <FormControl isInvalid={isInvalid}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          id={name}
          selected={selectedDate}
          onChange={(date) => {
            field.onChange(date);
            setSelectedDate(date);
          }}
          {...props}
        />
      )}
    />
    {isInvalid && <Text color="red.500">{errors.message}</Text>}
  </FormControl>
);

export default DatePickerField;