
import { z } from 'zod';

// Define the form schema using Zod
export const registerSchema = z.object({
  email: z.string().email('O correo electrónico é obrigatorio'),
  password: z.string().min(6, 'O contrasinal debe ter polo menos 6 caracteres'),
  confirmPassword: z.string(),
  full_name: z.string().min(3, 'O nome completo é obrigatorio'),
  phone: z.string().min(9, 'O teléfono é obrigatorio'),
  role: z.string({
    required_error: 'Selecciona un rol',
  }),
  specialty: z.string().optional(),
  school_code: z.string({
    required_error: 'Selecciona un centro educativo',
  }),
})
.refine(data => data.password === data.confirmPassword, {
  message: 'Os contrasinais non coinciden',
  path: ['confirmPassword'],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
