import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { 
    Box, 
    Heading, 
    VStack, 
    Text, 
    Checkbox, 
    Button, 
    Input 
} from '@chakra-ui/react';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [editedConclusion, setEditedConclusion] = useState({});

  useEffect(() => {
    listAppointments();
  }, []);

  const listAppointments = async () => {
    try {
      const response = await api.get('/api/appointment');
      setAppointments(response.data.items);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const handleCheckboxChange = async (id, currentSituation) => {
    const newSituation = currentSituation === 'Undone' ? 'Done' : 'Undone';
    try {
      await api.put(`/api/appointment/${id}`, { 
        situation: newSituation,
        conclusion: editedConclusion[id] || '' 
      });
      setAppointments(prevAppointments => 
        prevAppointments.map(appointment =>
          appointment.id === id ? { ...appointment, situation: newSituation } : appointment
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar a situação:', error);
    }
  };

  const handleEditClick = (id) => {
    setEditMode(prevEditMode => ({
      ...prevEditMode,
      [id]: true
    }));
    setEditedConclusion(prevEditedConclusion => ({
      ...prevEditedConclusion,
      [id]: appointments.find(appointment => appointment.id === id).conclusion
    }));
  };

  const handleSaveClick = async (id) => {
    const appointmentToUpdate = appointments.find(appointment => appointment.id === id);
    try {
      await api.put(`/api/appointment/${id}`, { 
        situation: appointmentToUpdate.situation,
        conclusion: editedConclusion[id]
      });
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === id ? { ...appointment, conclusion: editedConclusion[id] } : appointment
        )
      );
      setEditMode(prevEditMode => ({
        ...prevEditMode,
        [id]: false
      }));
    } catch (error) {
      console.error('Erro ao salvar a conclusão', error);
    }
  };

  const handleConclusionChange = (id, value) => {
    setEditedConclusion(prevEditedConclusion => ({
      ...prevEditedConclusion,
      [id]: value
    }));
  };

  const groupBy = (appointments) => {
    const grouped = {};
    appointments.forEach(appointment => {
      const date = new Date(appointment.scheduledDate).toLocaleDateString('pt-BR');
  
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(appointment);
    });
  
    for (const date in grouped) {
      grouped[date].sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
    }
  
    return Object.keys(grouped)
      .sort((a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-')))
      .reduce((sortedGrouped, date) => {
        sortedGrouped[date] = grouped[date];
        return sortedGrouped;
      }, {});
  };
  
  const groupedAppointments = groupBy(appointments);
  
  return (
    <Box maxW="720px" mx="auto" mt={40} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={8} mt={10}>Lista de Agendamentos</Heading>
      {Object.entries(groupedAppointments).map(([date, appointments]) => (
        <Box key={date} mt={4} p={4} borderWidth="1px" borderRadius="lg">
          <Heading as="h3" size="md">{date}</Heading>
          <VStack spacing={4} align="stretch">
            {appointments.map(appointment => (
              <Box key={appointment.id} p={4} borderWidth="1px" borderRadius="lg">
                <Text><strong>Nome:</strong> {appointment.name}</Text>
                <Text><strong>Data de Nascimento:</strong> {new Date(appointment.birthDate).toLocaleDateString()}</Text>
                <Text><strong>Data e Hora do Agendamento:</strong> {new Date(appointment.scheduledDate).toLocaleString()}</Text>
                <Checkbox 
                  isChecked={appointment.situation === 'Done'} 
                  onChange={() => handleCheckboxChange(appointment.id, appointment.situation)}
                >
                  {appointment.situation === 'Done' ? 'Concluído' : 'Não Concluído'}
                </Checkbox>
                {appointment.situation === 'Done' && (
                  <>
                    <Text><strong>Conclusão:</strong></Text>
                    {editMode[appointment.id] ? (
                      <Input
                        value={editedConclusion[appointment.id] || ''}
                        onChange={(e) => handleConclusionChange(appointment.id, e.target.value)}
                      />
                    ) : (
                      <Text>{appointment.conclusion}</Text>
                    )}
                    {editMode[appointment.id] ? (
                      <Button onClick={() => handleSaveClick(appointment.id)}>Salvar</Button>
                    ) : (
                      <Button onClick={() => handleEditClick(appointment.id)}>Editar</Button>
                    )}
                  </>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      ))}
    </Box>
  );  
}

export default AppointmentList;
