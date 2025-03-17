'use server';

import { SignUpFormSchema } from '../schemas/signupForm.schema';

export const signUp = async (prevState: unknown, formData: FormData) => {
  // Implementation of sign-up logic using the provided FormData
  const data = Object.fromEntries(formData.entries());
  const validatedFields = await SignUpFormSchema.safeParseAsync(data);
  if (!validatedFields.success) {
    const errors = validatedFields.error;
    return {
      data: Object.fromEntries(formData.entries()),
      errors: errors.flatten().fieldErrors
    };
  }
  // console.log(verifiedData);
};
