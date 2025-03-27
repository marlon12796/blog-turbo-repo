'use client';

import { Link } from 'lucide-react';
import { Button } from '../ui/Button';
import SubmitButton from '../auth/SubmitButton';
// import { useActionState } from 'react';

const DeleteForm = () => {
  // const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form className='flex justify-end gap-2'>
      <Button variant={'secondary'} asChild>
        <Link href={'/user/posts'}>Cancel</Link>
      </Button>
      <SubmitButton>Delete</SubmitButton>
    </form>
  );
};

export default DeleteForm;
