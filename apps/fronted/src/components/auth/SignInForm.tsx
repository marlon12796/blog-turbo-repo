import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import SubmitButton from './SubmitButton';

const SignInForm = () => {
  return (
    <form className="flex flex-col gap-6 w-full px-6">
      <div className="grid gap-1">
        <div className="flex gap-1">
          <Label htmlFor="email" className="basis-32">
            Email
          </Label>
          <Input id="email" name="email" placeholder="john@example.com" className="grow" />
        </div>
      </div>
      <div className="grid gap-1">
        <div className="flex gap-1">
          <Label htmlFor="password" className="basis-32">
            Password
          </Label>
          <Input id="password" name="password" type="password" className="grow" placeholder="******" />
        </div>
      </div>
      <SubmitButton className="mx-auto px-28 cursor-pointer ">Sign In </SubmitButton>
    </form>
  );
};

export default SignInForm;
