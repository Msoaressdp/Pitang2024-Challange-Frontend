import * as z from 'zod';

export const appointmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.date({ required_error: 'Data de Nascimento é obrigatória' }),
  scheduledDate: z.date({ required_error: 'Data e Hora do Agendamento são obrigatórias' }),
});
