import React from 'react';
import { Box, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useListState from '../hooks/useListState';
import AppointmentGroup from '../components/AppointmentGroup';

const AppointmentList: React.FC = () => {
  const {
    appointments,
    editMode,
    editedConclusion,
    handleCheckboxChange,
    handleEditClick,
    handleSaveClick,
    handleConclusionChange,
    handleDeleteClick,
    groupBy
  } = useListState();

  const groupedAppointments = groupBy(appointments);

  return (
    <Box bg={useColorModeValue('#f5f5dc', 'gray.800')} minH="100vh" py={12}>
      <Box
        maxW="720px"
        mx="auto"
        mt={40}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue('#e5e5c0', 'gray.700')}
        border="2px"
        borderColor="black"
      >
        <Heading mb={8} mt={10} textAlign="center">
          Lista de Agendamentos
        </Heading>
        <Button as={Link} to="/schedule" colorScheme="blue" mb={8} borderRadius="full" py={6}>
          Schedule
        </Button>
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
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AppointmentList;