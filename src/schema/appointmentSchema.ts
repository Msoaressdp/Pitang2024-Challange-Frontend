import * as z from 'zod';

export const appointmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.union([z.date(), z.null()]).refine((val): val is Date => val !== null, {
    message: 'Data de Nascimento é obrigatória',
  }),
  scheduledDate: z.union([z.date(), z.null()]).refine((val): val is Date => val !== null, {
    message: 'Data e Hora do Agendamento são obrigatórias',
  }),
});
