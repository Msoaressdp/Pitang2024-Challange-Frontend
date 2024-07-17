import React from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
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
    <Box maxW="720px" mx="auto" mt={40} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={8} mt={10}>Lista de Agendamentos</Heading>
      <Button as={Link} to="/schedule" colorScheme="blue" mb={8}>
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
  );
};

export default AppointmentList;