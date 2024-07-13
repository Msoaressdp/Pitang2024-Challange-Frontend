import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Schedule from './Schedule';
import '@testing-library/jest-dom';

describe('Schedule Component', () => {
  test('renders form elements correctly', () => {
    render(<Schedule />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data e hora do agendamento/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('allows user to fill out the form and submit', async () => {
    render(<Schedule />);

    const nameInput = screen.getByLabelText(/nome/i);
    const birthDateInput = screen.getByLabelText(/data de nascimento/i);
    const appointmentDateInput = screen.getByLabelText(/data e hora do agendamento/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    fireEvent.change(birthDateInput, { target: { value: '01/01/2000' } });
    fireEvent.change(appointmentDateInput, { target: { value: '15/07/2024 14:00' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/submitted data/i)).toBeInTheDocument();
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(screen.getByText(/jan 01 2000/i)).toBeInTheDocument();
      expect(screen.getByText(/jul 15 2024 14:00/i)).toBeInTheDocument();
    });
  });

  test('resets form fields after submission', async () => {
    render(<Schedule />);

    const nameInput = screen.getByLabelText(/nome/i);
    const birthDateInput = screen.getByLabelText(/data de nascimento/i);
    const appointmentDateInput = screen.getByLabelText(/data e hora do agendamento/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    fireEvent.change(birthDateInput, { target: { value: '01/01/1990' } });
    fireEvent.change(appointmentDateInput, { target: { value: '16/07/2024 15:00' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(birthDateInput.value).toBe('');
      expect(appointmentDateInput.value).toBe('');
    });
  });
});
