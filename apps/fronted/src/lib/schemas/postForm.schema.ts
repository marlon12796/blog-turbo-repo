import { z } from 'zod';

export const PostFormSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(20),
  postId: z.number().optional(),
  tags: z
    .string()
    .min(1)
    .refine((value) => value.split(',').every((tag) => tag.trim() !== ''))
    .transform((value) => value.split(',')),
  thumbnail: z.instanceof(File).optional(),
  thumbnailUrl: z.string().url().optional(),
  published: z.boolean()
});

export type PostFormSchemaType = z.infer<typeof PostFormSchema>;
