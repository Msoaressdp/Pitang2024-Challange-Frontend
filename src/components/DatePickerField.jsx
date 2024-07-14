import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, FormLabel, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

const DatePickerField = ({ control, name, label, errors, ...props }) => (
  <FormControl isInvalid={errors[name]}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          id={name}
          selected={field.value}
          onChange={(date) => field.onChange(date)}
          {...props}
        />
      )}
    />
    {errors[name] && <Text color="red.500">{errors[name].message}</Text>}
  </FormControl>
);

export default DatePickerField;
