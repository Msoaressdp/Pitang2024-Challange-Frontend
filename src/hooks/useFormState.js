import { useState } from 'react';

const useFormState = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(null);

  const resetForm = () => {
    setName('');
    setBirthDate(null);
    setScheduledDate(null);
  };

  return {
    name,
    setName,
    birthDate,
    setBirthDate,
    scheduledDate,
    setScheduledDate,
    resetForm,
  };
};

export default useFormState;
