'use client';
import { useActionState } from 'react';

import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import SubmitButton from './SubmitButton';
import { signUp } from '@/lib/actions/signUp';

const SignUpForm = () => {
  const [state, formAction] = useActionState(signUp, {
    data: {
      name: '',
      email: '',
      password: ''
    },
    errors: {
      name: [],
      email: [],
      password: []
    }
  });
  return (
    <form action={formAction} className="flex flex-col gap-6 w-full px-6">
      <div className="flex gap-1">
        <Label htmlFor="name" className="basis-32">
          Name
        </Label>
        <Input id="name" name="name" placeholder="John Doe" className="grow" />
      </div>
      <div className="flex gap-1">
        <Label htmlFor="email" className="basis-32">
          Email
        </Label>
        <Input id="email" name="email" placeholder="john@example.com" className="grow" />
      </div>
      <div className="flex gap-1">
        <Label htmlFor="password" className="basis-32">
          Password
        </Label>
        <Input id="password" name="password" type="password" className="grow" placeholder="******" />
      </div>
      <SubmitButton>Sign up </SubmitButton>
    </form>
  );
};

export default SignUpForm;
