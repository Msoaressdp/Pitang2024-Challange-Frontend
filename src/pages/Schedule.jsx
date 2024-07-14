import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePickerField from '../components/DatePickerField';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';

import { useModal } from '../context/ModalContext';
import SubmissionModal from '../components/ModalComponent';

const appointmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.date({ required_error: 'Data de Nascimento é obrigatória' }),
  scheduledDate: z.date({ required_error: 'Data e Hora do Agendamento são obrigatórias' }),
});

const Schedule = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(null);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(appointmentSchema),
    mode: 'onBlur'
  });

  const { showModal } = useModal();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
    setName('');
    setBirthDate(null);
    setScheduledDate(null);
    showModal('Agendamento criado com sucesso');
  };

  return (
    <Box maxW="720px" mx="auto" mt={40} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={8} mt={10}>Agendamento</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Nome:</FormLabel>
            <Input
              id="name"
              {...register('name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <Text color="red.500">{errors.name.message}</Text>}
          </FormControl>

          <DatePickerField
            control={control}
            name="birthDate"
            label="Data de Nascimento"
            errors={errors}
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
          />

          <DatePickerField
            control={control}
            name="scheduledDate"
            label="Data e Hora do Agendamento"
            errors={errors}
            selected={scheduledDate}
            onChange={(date) => setScheduledDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy HH:mm"
            minDate={new Date()}
            minTime={new Date(new Date().setHours(11, 0, 0, 0))}
            maxTime={new Date(new Date().setHours(20, 0))}
          />

          <Button mt={4} colorScheme="teal" type="submit">Submit</Button>
        </VStack>
      </form>

      {submittedData && (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
          <Heading as="h2" size="md">Submitted Data</Heading>
          <Text><strong>Nome:</strong> {submittedData.name}</Text>
          <Text><strong>Data de Nascimento:</strong> {submittedData.birthDate ? submittedData.birthDate.toLocaleDateString() : ''}</Text>
          <Text><strong>Data e Hora do Agendamento:</strong> {submittedData.scheduledDate ? submittedData.scheduledDate.toLocaleString() : ''}</Text>
        </Box>
      )}
      <SubmissionModal />
    </Box>
  );
};

export default Schedule;
