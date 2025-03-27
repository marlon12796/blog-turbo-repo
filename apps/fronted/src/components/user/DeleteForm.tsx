'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import SubmitButton from '../auth/SubmitButton';
import { useActionState, useEffect } from 'react';
import { deleteUserPost } from '@/lib/actions/posts';
import { useRouter } from 'next/navigation';

const initialState = { message: '' };

const DeleteForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const deletePostAction = async () => await deleteUserPost(id);
  const [state, formAction] = useActionState(deletePostAction, initialState);

  useEffect(() => {
    if (state.message) router.replace('/user/posts');
  }, [router, state.message]);

  return (
    <form className='flex justify-end gap-2' action={formAction}>
      <Button variant={'secondary'} asChild>
        <Link href='/user/posts'>Cancel</Link>
      </Button>
      <SubmitButton variant='destructive'>Delete</SubmitButton>
    </form>
  );
};

export default DeleteForm;
