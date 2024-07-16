import { useState, useEffect } from 'react';
import { UseFormStateReturn } from '../interfaces/index';

const useFormState = (setValue: (field: string, value: any) => void): UseFormStateReturn => {
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

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