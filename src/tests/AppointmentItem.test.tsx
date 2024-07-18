import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentItem from '../components/AppointmentItem';
import { AppointmentItemProps } from '../interfaces';
import { mockAppointment } from '../tests/mockAppointment';

const renderComponent = (props: Partial<AppointmentItemProps> = {}) => {
  const defaultProps: AppointmentItemProps = {
    appointment: mockAppointment,
    editMode: false,
    editedConclusion: '',
    onCheckboxChange: jest.fn(),
    onEditClick: jest.fn(),
    onSaveClick: jest.fn(),
    onConclusionChange: jest.fn(),
    onDeleteClick: jest.fn(),
    ...props,
  };

  return render(<AppointmentItem {...defaultProps} />);
};

describe('AppointmentItem', () => {

  test('should call onCheckboxChange when checkbox is clicked', () => {
    const onCheckboxChange = jest.fn();
    renderComponent({ onCheckboxChange });

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onCheckboxChange).toHaveBeenCalledWith(mockAppointment.id!, mockAppointment.situation);
  });

  test('should call onEditClick when edit button is clicked', () => {
    const onEditClick = jest.fn();
    renderComponent({ onEditClick });

    fireEvent.click(screen.getByText('Editar'));

    expect(onEditClick).toHaveBeenCalledWith(mockAppointment.id!);
  });

  test('should call onSaveClick when save button is clicked', () => {
    const onSaveClick = jest.fn();
    renderComponent({ editMode: true, onSaveClick });

    fireEvent.click(screen.getByText('Salvar'));

    expect(onSaveClick).toHaveBeenCalledWith(mockAppointment.id!);
  });

  test('should call onConclusionChange when conclusion input changes', () => {
    const onConclusionChange = jest.fn();
    renderComponent({ editMode: true, onConclusionChange });

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New conclusion' } });

    expect(onConclusionChange).toHaveBeenCalledWith(mockAppointment.id!, 'New conclusion');
  });

  test('should call onDeleteClick when delete button is clicked', () => {
    const onDeleteClick = jest.fn();
    renderComponent({ onDeleteClick });

    fireEvent.click(screen.getByText('Delete'));

    expect(onDeleteClick).toHaveBeenCalledWith(mockAppointment.id!);
  });
});