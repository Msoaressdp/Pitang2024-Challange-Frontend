import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '../context/ModalContext';
import SubmissionModal from '../components/ModalComponent';
import { appointmentSchema } from '../schema/appointmentSchema';
import useFormState from '../hooks/useFormState';
import DatePickerField from '../components/DatePickerField';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  VStack,
  Text
} from '@chakra-ui/react';

const Schedule = () => {
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(appointmentSchema),
    mode: 'onBlur',
  });

  const { name, setName, birthDate, setBirthDate, scheduledDate, setScheduledDate, resetForm } = useFormState(setValue);

  const { showModal } = useModal();
  const [submittedData, setSubmittedData] = React.useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
    resetForm();
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
            label="Data de Nascimento:"
            selectedDate={birthDate}
            setSelectedDate={setBirthDate}
            isInvalid={!!errors.birthDate}
            errors={errors.birthDate}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
          />

          <DatePickerField
            control={control}
            name="scheduledDate"
            label="Data e Hora do Agendamento:"
            selectedDate={scheduledDate}
            setSelectedDate={setScheduledDate}
            isInvalid={!!errors.scheduledDate}
            errors={errors.scheduledDate}
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
