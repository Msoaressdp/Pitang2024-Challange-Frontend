import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { appointmentSchema } from '../schema/appointmentSchema';
import { UseFormStateReturn } from '../interfaces/index';

const useFormState = (): UseFormStateReturn => {
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(appointmentSchema),
    mode: 'onBlur',
  });

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
    register,
    handleSubmit,
    control,
    errors
  };
};

export default useFormState;