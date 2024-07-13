import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
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

const appointmentSchema = z.object({
name: z.string().min(1,'Nome é obrigatório'),
birthDate: z.date({ required_error: 'Data de Nascimento é obrigatória' }),
scheduledDate: z.date({ required_error: 'Data e Hora do Agendamento são obrigatórias' }),
});

const Schedule = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(appointmentSchema),
    mode: 'onBlur'
  });

  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
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
            />
            {errors.name && <Text color="red.500">{errors.name.message}</Text>}
          </FormControl>

          <FormControl isInvalid={errors.birthDate}>
            <FormLabel htmlFor="birthDate">Data de Nascimento:</FormLabel>
            <Controller
              control={control}
              name="birthDate"
              render={({ field }) => (
                <DatePicker
                  id="birthDate"
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                />
              )}
            />
            {errors.birthDate && <Text color="red.500">{errors.birthDate.message}</Text>}
          </FormControl>

          <FormControl isInvalid={errors.scheduledDate}>
            <FormLabel htmlFor="appointmentDate">Data e Hora do Agendamento:</FormLabel>
            <Controller
              control={control}
              name="scheduledDate"
              render={({ field }) => (
                <DatePicker
                  id="appointmentDate"
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  timeCaption="Hora"
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={new Date()}
                  minTime={new Date(new Date().setHours(11, 0, 0, 0))}
                  maxTime={new Date(new Date().setHours(20, 0))}
                />
              )}
            />
             {errors.scheduledDate && <Text color="red.500">{errors.scheduledDate.message}</Text>}
          </FormControl>

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
    </Box>
  );
};

export default Schedule;