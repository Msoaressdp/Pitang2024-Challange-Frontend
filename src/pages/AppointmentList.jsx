import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { 
    Box, 
    Heading, 
    VStack, 
    Text 
} from '@chakra-ui/react';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

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
                <Text><strong>Situação:</strong> {appointment.situation}</Text>
                <Text><strong>Descrição:</strong> {appointment.desc}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      ))}
    </Box>
  );  
}

export default AppointmentList;