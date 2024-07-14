import { useState, useEffect } from 'react';

const useFormState = (setValue) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [scheduledDate, setScheduledDate] = useState(null);

  const resetForm = () => {
    setName('');
    setBirthDate(null);
    setScheduledDate(null);
  };

  useEffect(() => {
    setValue('name', name);
  }, [name, setValue]);

  useEffect(() => {
    setValue('birthDate', birthDate);
  }, [birthDate, setValue]);

  useEffect(() => {
    setValue('scheduledDate', scheduledDate);
  }, [scheduledDate, setValue]);

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
