import React, { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { getAppointments, updateAppointmentSituation, updateAppointmentConclusion } from '../services/api';
import AppointmentGroup from '../components/AppointmentGroup';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [editedConclusion, setEditedConclusion] = useState({});

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

  const handleCheckboxChange = async (id, currentSituation) => {
    const newSituation = currentSituation === 'Undone' ? 'Done' : 'Undone';
    try {
      await updateAppointmentSituation(id, newSituation, editedConclusion[id] || '');
      updateLocalAppointments(id, { situation: newSituation });
    } catch (error) {
      console.error('Erro ao atualizar a situação:', error);
    }
  };

  const handleEditClick = (id) => {
    setEditMode(prev => ({ ...prev, [id]: true }));
    setEditedConclusion(prev => ({
      ...prev,
      [id]: appointments.find(appointment => appointment.id === id).conclusion
    }));
  };

  const handleSaveClick = async (id) => {
    try {
      await updateAppointmentConclusion(id, appointments.find(appt => appt.id === id).situation, editedConclusion[id]);
      updateLocalAppointments(id, { conclusion: editedConclusion[id] });
      setEditMode(prev => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error('Erro ao salvar a conclusão', error);
    }
  };

  const handleConclusionChange = (id, value) => {
    setEditedConclusion(prev => ({ ...prev, [id]: value }));
  };

  const updateLocalAppointments = (id, updatedFields) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appt => 
        appt.id === id ? { ...appt, ...updatedFields } : appt
      )
    );
  };

  const groupBy = (appointments) => {
    const grouped = appointments.reduce((acc, appointment) => {
      const date = new Date(appointment.scheduledDate).toLocaleDateString('pt-BR');
      if (!acc[date]) acc[date] = [];
      acc[date].push(appointment);
      return acc;
    }, {});

    return Object.keys(grouped)
      .sort((a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')))
      .reduce((acc, date) => ({ ...acc, [date]: grouped[date].sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate)) }), {});
  };

  const groupedAppointments = groupBy(appointments);
  
  return (
    <Box maxW="720px" mx="auto" mt={40} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={8} mt={10}>Lista de Agendamentos</Heading>
      {Object.entries(groupedAppointments).map(([date, appointments]) => (
        <AppointmentGroup 
          key={date}
          date={date}
          appointments={appointments}
          editMode={editMode}
          editedConclusion={editedConclusion}
          onCheckboxChange={handleCheckboxChange}
          onEditClick={handleEditClick}
          onSaveClick={handleSaveClick}
          onConclusionChange={handleConclusionChange}
        />
      ))}
    </Box>
  );
};

export default AppointmentList;