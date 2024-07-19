import React from 'react';
import AppointmentItem from './AppointmentItem';
import { AppointmentGroupProps } from '../interfaces/index';
import { 
  Box, 
  Heading, 
  VStack, 
  useColorModeValue 
} from '@chakra-ui/react';

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
  <Box 
    mt={4} 
    p={4} 
    borderRadius="lg"
    border="2px"
    borderColor="black"
    bg={useColorModeValue('#f5f5dc', 'gray.800')}>
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