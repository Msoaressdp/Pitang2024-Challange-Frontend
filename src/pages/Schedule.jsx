import React, { useState } from 'react';
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

const Schedule = () => {
  const [name, setName] = useState('');
  const [scheduledDate, setScheduledDate] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAppointment = { name, scheduledDate };
    setSubmittedData(newAppointment);
    setName('');
    setScheduledDate(null);
  };

  return (
    <Box maxW="720px" mx="auto" mt={40} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={8} mt={10}>Agendamento</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel htmlFor="name">Nome:</FormLabel>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="appointmentDate">Data e Hora do Agendamento:</FormLabel>
            <DatePicker
              id="appointmentDate"
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
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit">Submit</Button>
        </VStack>
      </form>

      {submittedData && (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
           <Heading as="h2" size="md">Submitted Data</Heading>
          <Text><strong>Nome:</strong> {submittedData.name}</Text>
          <Text><strong>Data e Hora do Agendamento:</strong> {submittedData.scheduledDate ? submittedData.scheduledDate.toString() : ''}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Schedule;