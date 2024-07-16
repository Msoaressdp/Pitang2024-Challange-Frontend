import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import AppointmentItem from './AppointmentItem';

interface Appointment {
  name: string;
  birthDate: Date;
  scheduledDate: Date;
  id?: string;
  situation: string;
  conclusion?: string;
}

interface AppointmentGroupProps {
  date: string;
  appointments: Appointment[];
  editMode: { [key: string]: boolean };
  editedConclusion: { [key: string]: string };
  onCheckboxChange: (id: string, situation: string) => void;
  onEditClick: (id: string) => void;
  onSaveClick: (id: string) => void;
  onConclusionChange: (id: string, value: string) => void;
  onDeleteClick: (id: string) => void;
}

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