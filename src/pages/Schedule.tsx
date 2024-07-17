import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import SubmissionModal from '../components/ModalComponent';
import useFormState from '../hooks/useFormState';
import DatePickerField from '../components/DatePickerField';
import { storeAppointment } from '../services/api';
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

const Schedule: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    name,
    setName,
    birthDate,
    setBirthDate,
    scheduledDate,
    setScheduledDate,
    resetForm
  } = useFormState();

  const { showModal } = useModal();

  const onSubmit = async (data: any) => {
    try {
      const response = await storeAppointment(data);
      showModal('Agendamento criado com sucesso');
      resetForm();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message ?? 'Erro ao criar agendamento';
      showModal(errorMessage);
    }
  };

  return (
    <Box maxW="720px" mx="auto" mt={40} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={8} mt={10}>Agendamento de Vacinas Covid-19</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nome:</FormLabel>
            <Input
              id="name"
              {...register('name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <Text color="red.500">
                {(errors.name as any)?.message?.toString()}
              </Text>
            )}
          </FormControl>

          <DatePickerField
            control={control}
            name="birthDate"
            label="Data de Nascimento:"
            selectedDate={birthDate}
            setSelectedDate={setBirthDate}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
          />

          <DatePickerField
            control={control}
            name="scheduledDate"
            label="Data e Hora do Agendamento:"
            selectedDate={scheduledDate}
            setSelectedDate={setScheduledDate}
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

      <Box mt={4}>
        <Link to="/list">
          <Button colorScheme="blue">Ver Agendamentos</Button>
        </Link>
      </Box>

      <SubmissionModal />
    </Box>
  );
};

export default Schedule;