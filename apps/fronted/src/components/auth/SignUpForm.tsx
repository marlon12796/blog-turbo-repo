'use client';
import { useActionState } from 'react';

import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import SubmitButton from './SubmitButton';
import { signUp } from '@/lib/actions/signUp';

const SignUpForm = () => {
  const [state, formAction] = useActionState(signUp, {
    data: {},
    errors: {}
  });
  // console.log(state.data.email)
  return (
    <form action={formAction} className="flex flex-col gap-6 w-full px-6">
      {state.errors._form && <p className="text-red-500 text-sm">{state.errors._form[0]}</p>}
      <div className="grid gap-1">
        <div className="flex gap-1">
          <Label htmlFor="name" className="basis-32">
            Name
          </Label>
          <Input id="name" name="name" placeholder="John Doe" className="grow" />
        </div>
        {state.errors?.name && <p className="text-red-700 text-sm">{state.errors.name[0]}</p>}
      </div>
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
        {state.errors?.password && (
          <div className="text-sm text-red-700">
            <ul>
              {state.errors.password.map((err) => (
                <li key={err.toString()}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <SubmitButton>Sign up </SubmitButton>
    </form>
  );
};

export default SignUpForm;
