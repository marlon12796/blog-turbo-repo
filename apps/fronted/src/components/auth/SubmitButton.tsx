'use client';
import { useFormStatus } from 'react-dom';
import { Button, buttonVariants } from '../ui/Button';
import { ButtonHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
const SubmitButton = ({ children, className, ...props }: ButtonTypes) => {
  const { pending } = useFormStatus();

  return (
    <Button color='blue' type='submit' className={className} disabled={pending} {...props}>
      {pending ? <span className='animate-pulse opacity-70'>Enviando...</span> : children}
    </Button>
  );
};

export default SubmitButton;
