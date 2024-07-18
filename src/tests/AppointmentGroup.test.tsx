import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentGroup from '../components/AppointmentGroup';
import { AppointmentGroupProps } from '../interfaces';
import { mockAppointment } from '../tests/mockAppointment';

const defaultProps: AppointmentGroupProps = {
  date: '2024-07-18',
  appointments: [mockAppointment],
  editMode: { '1': false },
  editedConclusion: { '1': '' },
  onCheckboxChange: jest.fn(),
  onEditClick: jest.fn(),
  onSaveClick: jest.fn(),
  onConclusionChange: jest.fn(),
  onDeleteClick: jest.fn()
};

describe('AppointmentGroup', () => {
  it('should render without crashing', () => {
    render(<AppointmentGroup {...defaultProps} />);
    
    expect(screen.getByText('2024-07-18')).toBeTruthy();
    expect(screen.getByText(mockAppointment.name)).toBeTruthy();
  });

  it('should call onEditClick when edit button is clicked', () => {
    render(<AppointmentGroup {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox', { name: /concluído/i });
    fireEvent.click(checkbox);

    const editButton = screen.getByRole('button', { name: /editar/i });
    expect(editButton).toBeEnabled();
    fireEvent.click(editButton);
    
    expect(defaultProps.onEditClick).toHaveBeenCalledWith(mockAppointment.id);
  });

  it('should call onCheckboxChange when a checkbox is changed', () => {
    render(<AppointmentGroup {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox', { name: /concluído/i });
    fireEvent.click(checkbox);
    
    expect(defaultProps.onCheckboxChange).toHaveBeenCalledWith(mockAppointment.id, 'Done');
  });

  it('should call onDeleteClick when delete button is clicked', () => {
    render(<AppointmentGroup {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(defaultProps.onDeleteClick).toHaveBeenCalledWith(mockAppointment.id);
  });
});