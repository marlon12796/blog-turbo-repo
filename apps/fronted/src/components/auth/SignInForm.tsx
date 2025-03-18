'use client';
import { useActionState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { login } from '@/lib/actions/login';
import SubmitButton from './SubmitButton';

const SignInForm = () => {
  const [state, formAction] = useActionState(login, { data: {}, errors: {} });
  return (
    <form action={formAction} className="flex flex-col gap-6 w-full px-6">
      {state.errors._form && <p className="text-red-500 text-sm">{state.errors._form[0]}</p>}

      <div className="grid gap-1">
        <div className="flex gap-1">
          <Label htmlFor="email" className="basis-32">
            Email
          </Label>
          <Input id="email" name="email" placeholder="john@example.com" className="grow" />
        </div>
        {state.errors?.email && <p className="text-red-700 text-sm">{state.errors.email[0]}</p>}
      </div>
      <div className="grid gap-1">
        <div className="flex gap-1">
          <Label htmlFor="password" className="basis-32">
            Password
          </Label>
          <Input id="password" name="password" type="password" className="grow" placeholder="******" />
        </div>
        {state?.errors?.password && <p className="text-red-500 text-sm">{state.errors.password[0]}</p>}
      </div>
      <SubmitButton className="cursor-pointer ">Sign In </SubmitButton>
    </form>
  );
};

export default SignInForm;
