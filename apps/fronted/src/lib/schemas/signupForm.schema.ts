import { z } from 'zod';

export const SignUpFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }).trim(),
  email: z.string().email({ message: 'Debe ser un correo válido.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    .regex(/[a-zA-Z]/, { message: 'Debe contener al menos una letra.' })
    .regex(/[0-9]/, { message: 'Debe contener al menos un número.' })
    .regex(/[\W_]/, { message: 'Debe contener al menos un carácter especial.' }) 
    .trim()
});
