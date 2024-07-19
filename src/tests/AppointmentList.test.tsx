import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppointmentList from '../pages/AppointmentList';
import { mockAppointment } from '../tests/mockAppointment';
import useListState from '../hooks/useListState';
import { EditMode, EditedConclusion } from '../interfaces/index';

jest.mock('../hooks/useListState');

const mockUseListState = useListState as jest.MockedFunction<typeof useListState>;

describe('AppointmentList', () => {
  const handleCheckboxChangeMock = jest.fn();
  const handleEditClickMock = jest.fn();
  const handleSaveClickMock = jest.fn();
  const handleConclusionChangeMock = jest.fn();
  const handleDeleteClickMock = jest.fn();

  beforeEach(() => {
    mockUseListState.mockReturnValue({
      appointments: [mockAppointment],
      editMode: { [mockAppointment.id]: false } as EditMode,
      editedConclusion: { [mockAppointment.id]: '' } as EditedConclusion,
      handleCheckboxChange: handleCheckboxChangeMock,
      handleEditClick: handleEditClickMock,
      handleSaveClick: handleSaveClickMock,
      handleConclusionChange: handleConclusionChangeMock,
      handleDeleteClick: handleDeleteClickMock,
      groupBy: jest.fn(() => ({
        '2024-08-21': [mockAppointment],
      })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  test('renders the list of appointments', () => {
    renderWithRouter(<AppointmentList />);

    expect(screen.getByText('Lista de Agendamentos')).toBeInTheDocument();
    expect(screen.getByText('Preencher Formulário')).toBeInTheDocument();
    expect(screen.getByText('Matheus Soares da Silva Dantas Pereira')).toBeInTheDocument();
  });

  test('navigates to schedule form when button is clicked', () => {
    renderWithRouter(<AppointmentList />);

    const button = screen.getByText('Preencher Formulário');
    fireEvent.click(button);

  });

  it('edit button appears when checkbox is checked', () => {
    renderWithRouter(<AppointmentList />);

    const checkbox = screen.getByLabelText('Concluído');
    fireEvent.click(checkbox);

    const editButton = screen.getByText('Editar');
    expect(editButton).toBeInTheDocument();
    expect(editButton).toBeVisible();
  });

  it('allows editing conclusion of an appointment', () => {
    renderWithRouter(<AppointmentList />);

    const checkbox = screen.getByLabelText('Concluído');
    fireEvent.click(checkbox);

    const editButton = screen.getByText('Editar');
    fireEvent.click(editButton);

    expect(handleEditClickMock).toHaveBeenCalledWith(mockAppointment.id);
  });

  test('allows marking an appointment as completed', () => {
    renderWithRouter(<AppointmentList />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleCheckboxChangeMock).toHaveBeenCalledWith(mockAppointment.id, mockAppointment.situation);
  });

  test('allows deleting an appointment', () => {
    renderWithRouter(<AppointmentList />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(handleDeleteClickMock).toHaveBeenCalledWith(mockAppointment.id);
  });

  test('allows saving edited conclusion', () => {
    mockUseListState.mockReturnValueOnce({
      appointments: [mockAppointment],
      editMode: { [mockAppointment.id]: true } as EditMode,
      editedConclusion: { [mockAppointment.id]: 'New Conclusion' } as EditedConclusion,
      handleCheckboxChange: handleCheckboxChangeMock,
      handleEditClick: handleEditClickMock,
      handleSaveClick: handleSaveClickMock,
      handleConclusionChange: handleConclusionChangeMock,
      handleDeleteClick: handleDeleteClickMock,
      groupBy: jest.fn(() => ({
        '2024-08-21': [mockAppointment],
      })),
    });

    renderWithRouter(<AppointmentList />);

    const saveButton = screen.getByText('Salvar');
    fireEvent.click(saveButton);

    expect(handleSaveClickMock).toHaveBeenCalledWith(mockAppointment.id);
  });
});