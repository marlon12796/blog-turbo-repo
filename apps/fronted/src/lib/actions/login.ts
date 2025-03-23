'use server';

import { redirect } from 'next/navigation';
import { signInMutation } from '../helpers/gqlQueries';
import { publicClient } from '../helpers/urqlClient';
import { FormState } from '../types/formState';
import { LoginFormSchema } from '../schemas/loginForm.schema';
import { revalidatePath } from 'next/cache';
import { createSession } from '../helpers/session';
import { SignIn } from '../types/modelTypes';

export const login = async (prevState: unknown, formData: FormData): Promise<FormState> => {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = await LoginFormSchema.safeParseAsync(data);
  if (!validatedFields.success) {
    const errors = validatedFields.error;
    return {
      data: Object.fromEntries(formData.entries()),
      errors: errors.flatten().fieldErrors
    };
  }
  try {
    const result = await publicClient.mutation(signInMutation, { signInInput: { ...validatedFields.data } });
    if (result.error) {
      // console.log(result.error.graphQLErrors[0].extensions.originalErro);
      return {
        data: Object.fromEntries(formData.entries()),
        errors: {
          _form: [result.error.graphQLErrors[0].message]
        }
      };
    }
    const token: SignIn = result.data;
    await createSession({
      accessToken: token.signIn.accessToken,
      user: { id: token.signIn.id, name: token.signIn.name, avatar: token.signIn.avatar }
    });
  } catch (err) {
    return {
      data,
      errors: {
        _form: ['Ocurrió un error inesperado. Por favor, inténtalo más tarde.']
      }
    };
  }
  revalidatePath('/');
  redirect('/');
};
