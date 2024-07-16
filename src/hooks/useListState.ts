import { useState, useEffect } from 'react';
import { getAppointments, updateAppointmentSituation, updateAppointmentConclusion, deleteAppointment } from '../services/api';
import { Appointment, EditMode, EditedConclusion } from '../interfaces/index';

const useListState = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editMode, setEditMode] = useState<EditMode>({});
  const [editedConclusion, setEditedConclusion] = useState<EditedConclusion>({});

  useEffect(() => {
    listAppointments();
  }, []);

  const listAppointments = async () => {
    try {
      const items = await getAppointments();
      setAppointments(items);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const handleCheckboxChange = async (id: string, currentSituation: string) => {
    const newSituation = currentSituation === 'Undone' ? 'Done' : 'Undone';
    try {
      await updateAppointmentSituation(id, newSituation, editedConclusion[id] || '');
      updateLocalAppointments(id, { situation: newSituation });
    } catch (error) {
      console.error('Erro ao atualizar a situação:', error);
    }
  };

  const handleEditClick = (id: string) => {
    setEditMode(prev => ({ ...prev, [id]: true }));
    const appointment = appointments.find(appointment => appointment.id === id);
    if (appointment) {
      setEditedConclusion(prev => ({
        ...prev,
        [id]: appointment.conclusion || ''
      }));
    }
  };

  const handleSaveClick = async (id: string) => {
    const appointment = appointments.find(appt => appt.id === id);
    if (appointment) {
      try {
        await updateAppointmentConclusion(id, appointment.situation, editedConclusion[id]);
        updateLocalAppointments(id, { conclusion: editedConclusion[id] });
        setEditMode(prev => ({ ...prev, [id]: false }));
      } catch (error) {
        console.error('Erro ao salvar a conclusão', error);
      }
    }
  };

  const handleConclusionChange = (id: string, value: string) => {
    setEditedConclusion(prev => ({ ...prev, [id]: value }));
  };

  const updateLocalAppointments = (id: string, updatedFields: Partial<Appointment>) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appt => 
        appt.id === id ? { ...appt, ...updatedFields } : appt
      )
    );
  };

  const handleDeleteClick = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments(prevAppointments => prevAppointments.filter(appt => appt.id !== id));
    } catch (error) {
      console.error('Erro ao deletar o agendamento:', error);
    }
  };

  const groupBy = (appointments: Appointment[]) => {
    const grouped = appointments.reduce((acc, appointment) => {
      const date = new Date(appointment.scheduledDate).toLocaleDateString('pt-BR');
      if (!acc[date]) acc[date] = [];
      acc[date].push(appointment);
      return acc;
    }, {} as { [key: string]: Appointment[] });

    return Object.keys(grouped)
      .sort((a, b) => new Date(a.split('/').reverse().join('-')).getTime() - new Date(b.split('/').reverse().join('-')).getTime())
      .reduce((acc, date) => ({
        ...acc,
        [date]: grouped[date].sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
      }), {} as { [key: string]: Appointment[] });
  };

  return {
    appointments,
    editMode,
    editedConclusion,
    handleCheckboxChange,
    handleEditClick,
    handleSaveClick,
    handleConclusionChange,
    handleDeleteClick,
    groupBy
  };
};

export default useListState;