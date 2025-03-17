import SignUpForm from '@/components/auth/SignUpForm';
import Link from 'next/link';

const SignUp = () => {
  return (
    <div className="bg-white py-8 rounded-md shadow-md w-96 flex flex-col gap-4 justify-center items-center">
      <h2 className="text-center text-2xl font-bold mb-2">Sign Up Page</h2>
      {/* Sign Up form here */}
      <SignUpForm />
      <div className='flex px-6 w-full justify-start gap-4'>
        <p>Already have an account?</p>
        <Link className="underline" href={'/auth/signin'}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
