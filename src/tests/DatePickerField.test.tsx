import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import DatePickerField from '../components/DatePickerField';
import { ChakraProvider } from '@chakra-ui/react';

const DatePickerFieldWrapper: React.FC<any> = (props) => {
  const methods = useForm();
  return (
    <ChakraProvider>
      <FormProvider {...methods}>
        <DatePickerField {...props} control={methods.control} />
      </FormProvider>
    </ChakraProvider>
  );
};

describe('DatePickerField', () => {
  it('renders without crashing and shows the label and placeholder text', () => {
    render(
      <DatePickerFieldWrapper
        name="testDate"
        label="Test Date"
        selectedDate={null}
        setSelectedDate={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/test date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/selecione uma data/i)).toBeInTheDocument();
  });

  it('updates the selected date when a date is picked', async () => {
    const setSelectedDate = jest.fn();
    render(
      <DatePickerFieldWrapper
        name="testDate"
        label="Test Date"
        selectedDate={null}
        setSelectedDate={setSelectedDate}
      />
    );

    fireEvent.click(screen.getByPlaceholderText(/selecione uma data/i));
    const today = new Date();
    const dayToSelect = today.getDate().toString();
    
    fireEvent.click(screen.getByText(dayToSelect));

    await waitFor(() => {
      expect(setSelectedDate).toHaveBeenCalled();
    });
  });

  it('clears the date when clear button is clicked', async () => {
    const setSelectedDate = jest.fn();
    render(
      <DatePickerFieldWrapper
        name="testDate"
        label="Test Date"
        selectedDate={new Date()}
        setSelectedDate={setSelectedDate}
      />
    );

    fireEvent.click(screen.getByLabelText('Close'));

    await waitFor(() => {
      expect(setSelectedDate).toHaveBeenCalledWith(null);
    });
  });
});