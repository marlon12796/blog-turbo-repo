import SignInForm from '@/components/auth/SignInForm';
import { buttonVariants } from '@/components/ui/Button';
import { CONFIG } from '@/constants';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div className=" bg-white py-8 border rounded-md gap-3 shadow-md w-[26rem] flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      <SignInForm />
      <div className="flex  gap-4 items-center mt-2">
        <Link href={'/auth/forgot'}>Forgot Your Password?</Link>
        <Link href={`${CONFIG.BACKEND_URL}/auth/google/login`} className={buttonVariants({ variant: 'outline' })}>
          Sign in with Google
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
