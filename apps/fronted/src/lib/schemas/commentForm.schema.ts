import { z } from 'zod';

export const CommentFormSchema = z.object({
  content: z
    .string()
    .min(5, 'El comentario debe tener al menos 5 caracteres.')
    .max(356, 'El comentario no puede exceder los 356 caracteres.')
    .trim(), 

  postId: z
    .string()
    .transform((val) => {
      const parsed = parseInt(val);
      return isNaN(parsed) ? NaN : parsed;
    })
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'El postId debe ser un número válido y mayor a 0.'
    })
});
