import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Schedule from '../pages/Schedule';
import { ModalProvider } from '../context/ModalContext';
import { mockAppointment } from '../tests/mockAppointment';
import * as api from '../services/api';

jest.mock('../services/api');

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ModalProvider>
        {ui}
      </ModalProvider>
    </BrowserRouter>
  );
};

describe('Schedule Page', () => {
  it('should render the schedule form correctly', () => {
    renderWithProviders(<Schedule />);

    screen.getByText('Agendamento de Vacinas Covid-19');
    screen.getByLabelText('Nome:');
    screen.getByLabelText('Data de Nascimento:');
    screen.getByLabelText('Data e Hora do Agendamento:');
  });

  it('should handle form submission successfully', async () => {
    (api.storeAppointment as jest.Mock).mockResolvedValueOnce(mockAppointment);

    renderWithProviders(<Schedule />);

    fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Matheus Soares da Silva Dantas Pereira' } });
    fireEvent.change(screen.getByLabelText('Data de Nascimento:'), { target: { value: '01/12/1998' } });
    fireEvent.change(screen.getByLabelText('Data e Hora do Agendamento:'), { target: { value: '21/08/2024 11:00' } });

    fireEvent.click(screen.getByRole('button', { name: /agendar/i }));

    await waitFor(() => {
      screen.getByText('Agendamento criado com sucesso');
    });
  });

  it('should handle form submission failure', async () => {
    (api.storeAppointment as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          message: 'Erro ao criar agendamento',
        },
      },
    });

    renderWithProviders(<Schedule />);

    fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Matheus Soares da Silva Dantas Pereira' } });
    fireEvent.change(screen.getByLabelText('Data de Nascimento:'), { target: { value: '01/12/1998' } });
    fireEvent.change(screen.getByLabelText('Data e Hora do Agendamento:'), { target: { value: '21/08/2024 11:00' } });

    fireEvent.click(screen.getByRole('button', { name: /agendar/i }));

    await waitFor(() => {
      screen.getByText('Erro ao criar agendamento');
    });
  });

  it('should update the name field value correctly', () => {
    renderWithProviders(<Schedule />);

    const nameInput = screen.getByLabelText('Nome:');
    fireEvent.change(nameInput, { target: { value: 'Matheus Soares da Silva Dantas Pereira' } });

    if (nameInput instanceof HTMLInputElement) {
      expect(nameInput.value).toBe('Matheus Soares da Silva Dantas Pereira');
    }
  });

  it('should update the birth date field value correctly', () => {
    renderWithProviders(<Schedule />);

    const birthDateInput = screen.getByLabelText('Data de Nascimento:');
    fireEvent.change(birthDateInput, { target: { value: '01/12/1998' } });

    if (birthDateInput instanceof HTMLInputElement) {
      expect(birthDateInput.value).toBe('01/12/1998');
    }
  });

  it('should update the scheduled date field value correctly', () => {
    renderWithProviders(<Schedule />);

    const scheduledDateInput = screen.getByLabelText('Data e Hora do Agendamento:');
    fireEvent.change(scheduledDateInput, { target: { value: '21/08/2024 11:00' } });

    if (scheduledDateInput instanceof HTMLInputElement) {
      expect(scheduledDateInput.value).toBe('21/08/2024 11:00');
    }
  });
});