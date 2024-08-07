import React from 'react';
import { AppointmentItemProps } from '../interfaces/index';
import { 
  Box, 
  Text, 
  Checkbox, 
  Button, 
  Input,
  useColorModeValue
} from '@chakra-ui/react';

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  editMode,
  editedConclusion,
  onCheckboxChange,
  onEditClick,
  onSaveClick,
  onConclusionChange,
  onDeleteClick
}) => (
  <Box p={4} bg={useColorModeValue('#f5f5dc', 'gray.800')}
  >
    <Text><strong>Nome:</strong> {appointment.name}</Text>
    <Text><strong>Data de Nascimento:</strong> {new Date(appointment.birthDate).toLocaleDateString()}</Text>
    <Text><strong>Data e Hora do Agendamento:</strong> {new Date(appointment.scheduledDate).toLocaleString()}</Text>
    <Checkbox 
      isChecked={appointment.situation === 'Done'} 
      onChange={() => onCheckboxChange(appointment.id!, appointment.situation)}
    >
      {appointment.situation === 'Done' ? 'Concluído' : 'Não Concluído'}
    </Checkbox>
    {appointment.situation === 'Done' && (
      <>
        <Text><strong>Conclusão:</strong></Text>
        {editMode ? (
          <Input
            value={editedConclusion || ''}
            onChange={(e) => onConclusionChange(appointment.id!, e.target.value)}
          />
        ) : (
          <Text>{appointment.conclusion}</Text>
        )}
        {editMode ? (
          <Button onClick={() => onSaveClick(appointment.id!)}>Salvar</Button>
        ) : (
          <Button onClick={() => onEditClick(appointment.id!)}>Editar</Button>
        )}
      </>
    )}
    <Button onClick={() => onDeleteClick(appointment.id!)} ml={2} colorScheme="red">
      Delete
    </Button>
  </Box>
);

export default AppointmentItem;