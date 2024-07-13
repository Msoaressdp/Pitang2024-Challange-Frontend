import React, { useState } from 'react';
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
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAppointment = { name };
    setSubmittedData(newAppointment);
    setName('');
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

          <Button mt={4} colorScheme="teal" type="submit">Submit</Button>
        </VStack>
      </form>

      {submittedData && (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
          <Heading as="h2" size="md">Dados Submetidos</Heading>
          <Text><strong>Nome:</strong> {submittedData.name}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Schedule;