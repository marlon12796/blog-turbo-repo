import { deleteSession } from '@/lib/helpers/session';
import { redirect } from 'next/navigation';

export async function POST() {
  await deleteSession();
  redirect('/');
}
