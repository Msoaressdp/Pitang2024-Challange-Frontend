import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import AppointmentItem from './AppointmentItem';

const AppointmentGroup = ({ date, appointments, editMode, editedConclusion, onCheckboxChange, onEditClick, onSaveClick, onConclusionChange }) => (
  <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
    <Heading as="h3" size="md">{date}</Heading>
    <VStack spacing={4} align="stretch">
      {appointments.map(appointment => (
        <AppointmentItem 
          key={appointment.id}
          appointment={appointment}
          editMode={editMode[appointment.id]}
          editedConclusion={editedConclusion[appointment.id]}
          onCheckboxChange={onCheckboxChange}
          onEditClick={onEditClick}
          onSaveClick={onSaveClick}
          onConclusionChange={onConclusionChange}
        />
      ))}
    </VStack>
  </Box>
);

export default AppointmentGroup;