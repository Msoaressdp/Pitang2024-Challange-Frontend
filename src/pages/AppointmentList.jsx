import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import api from '../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    listAppointments();
  }, []);

  const listAppointments = async () => {
    try {
      const response = await api.get('/api/appointments');
      setAppointments(response.data.items);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };


  return (
    <Box maxW="720px" mx="auto" mt={40} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={8} mt={10}>Lista de Agendamentos</Heading>
      {Object.entries(appointments).map(([dateHour, appointment]) => (
        <Box key={dateHour} mt={4} p={4} borderWidth="1px" borderRadius="lg">
          <Heading as="h3" size="md">{dateHour}</Heading>
          <VStack spacing={4} align="stretch">
            <Box key={appointment.id} p={4} borderWidth="1px" borderRadius="lg">
              <Text><strong>Nome:</strong> {appointment.name}</Text>
              <Text><strong>Data de Nascimento:</strong> {new Date(appointment.birthDate).toLocaleDateString()}</Text>
              <Text><strong>Data e Hora do Agendamento:</strong> {new Date(appointment.scheduledDate).toLocaleString()}</Text>
              <Text><strong>Situação:</strong> {appointment.situation}</Text>
              <Text><strong>Descrição:</strong> {appointment.desc}</Text>
            </Box>
          </VStack>
        </Box>
      ))}
    </Box>
  );
};

export default Appointments;