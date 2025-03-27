'use client';
import SubmitButton from '@/components/auth/SubmitButton';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { deleteUserPost } from '@/lib/actions/posts';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

const Page = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const deletePostAction = async () => await deleteUserPost(+postId);
  const [open, setOpen] = useState(true);
  const [state, formAction] = useActionState(deletePostAction, { message: '' });
  useEffect(() => {
    if (state.message) {
      setOpen(false);
      router.replace('/user/posts');
    }
  }, [router, state.message]);

  const onDismiss = () => {
    router.back();
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete This Post!</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onDismiss} variant={'secondary'} className='cursor-pointer'>
            Cancel
          </Button>
          <form action={formAction} className='p-0'>
            <SubmitButton variant='destructive' className='cursor-pointer'>
              Delete
            </SubmitButton>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Page;
