import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import AppointmentItem from './AppointmentItem';
import { AppointmentGroupProps } from '../interfaces/index';

const AppointmentGroup: React.FC<AppointmentGroupProps> = ({
  date,
  appointments,
  editMode,
  editedConclusion,
  onCheckboxChange,
  onEditClick,
  onSaveClick,
  onConclusionChange,
  onDeleteClick
}) => (
  <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
    <Heading as="h3" size="md">{date}</Heading>
    <VStack spacing={4} align="stretch">
      {appointments.map(appointment => (
        <AppointmentItem 
          key={appointment.id}
          appointment={appointment}
          editMode={editMode[appointment.id!]}
          editedConclusion={editedConclusion[appointment.id!]}
          onCheckboxChange={onCheckboxChange}
          onEditClick={onEditClick}
          onSaveClick={onSaveClick}
          onConclusionChange={onConclusionChange}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </VStack>
  </Box>
);

export default AppointmentGroup;