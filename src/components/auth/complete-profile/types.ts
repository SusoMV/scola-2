
import { z } from 'zod';

// Define the form schema using Zod
export const completeProfileSchema = z.object({
  full_name: z.string().min(3, 'O nome completo é obrigatorio'),
  school: z.string({
    required_error: 'Selecciona un centro educativo',
  }),
  role: z.string({
    required_error: 'Selecciona un rol',
  }),
  specialization: z.string({
    required_error: 'Selecciona unha especialidade',
  }),
});

export type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>;
