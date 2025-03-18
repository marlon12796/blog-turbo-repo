'use server';

import { redirect } from 'next/navigation';
import { createUserMutation } from '../helpers/gqlQueries';
import { getClient } from '../helpers/urqlClient';
import { SignUpFormSchema } from '../schemas/signupForm.schema';
import { FormState } from '../types/formState';

export const signUp = async (prevState: unknown, formData: FormData): Promise<FormState> => {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = await SignUpFormSchema.safeParseAsync(data);
  if (!validatedFields.success) {
    const errors = validatedFields.error;
    return {
      data: Object.fromEntries(formData.entries()),
      errors: errors.flatten().fieldErrors
    };
  }
  try {
    const result = await getClient().mutation(createUserMutation, { createUserInput: { ...validatedFields.data } });
    if (result.error) {
      return {
        data: Object.fromEntries(formData.entries()),
        errors: {
          _form: ['Ocurrió un error al crear el usuario. Por favor, inténtalo de nuevo.']
        }
      };
    }
  } catch {
    return {
      data,
      errors: {
        _form: ['Ocurrió un error inesperado. Por favor, inténtalo más tarde.']
      }
    };
  }
  redirect('/auth/signin');
};
