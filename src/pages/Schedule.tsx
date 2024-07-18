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
  Text,
  Container,
  Divider,
  useColorModeValue,
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
    <Container maxW="container.md" py={12}>
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
        borderRadius="lg"
      >
        <Heading mb={8} textAlign="center">Agendamento de Vacinas Covid-19</Heading>
        <Divider mb={8} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6} align="stretch">
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nome:</FormLabel>
              <Input
                id="name"
                {...register('name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome completo"
                variant="filled"
                size="lg"
                borderRadius="full"
              />
              {errors.name && (
                <Text color="red.500" mt={2}>
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
              minTime={new Date(new Date().setHours(10, 0, 0, 0))}
              maxTime={new Date(new Date().setHours(22, 0))}
            />

            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              size="lg"
              width="full"
              borderRadius="full"
              py={6}
            >
              Agendar
            </Button>
          </VStack>
        </form>

        <Box mt={8} textAlign="center">
          <Link to="/list">
            <Button colorScheme="blue" size="lg" borderRadius="full" py={6}>
              Ver Agendamentos
            </Button>
          </Link>
        </Box>

        <SubmissionModal />
      </Box>
    </Container>
  );
};

export default Schedule;