import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import DeleteForm from '@/components/user/DeleteForm';
import { AlertCircle } from 'lucide-react';

type DeleteProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    title?: string;
  }>;
};

const Page = async (props: DeleteProps) => {
  const params = await props.params;
  const searchParam = await props.searchParams;
  return (
    <Card className='max-w-xl p-[1.5em_2em]'>
      <CardHeader className='p-0'>
        <CardTitle className='flex justify-between  items-center font-thin'>
          <p className='text-red-500 font-semibold'>Delete The Post</p>
          <AlertCircle size={24} color='red' />
        </CardTitle>
      </CardHeader>
      <CardDescription>
        <p>This action cannot be undone. This will permanently delete your post and remove its data from our servers.</p>
        <hr className='m-3' />
        <p className='text-slate-400 font-bold'>Title of the Post</p>
        <p>{searchParam?.title}</p>
      </CardDescription>
      <CardContent>
        <DeleteForm id={parseInt(params.id)} />
      </CardContent>
    </Card>
  );
};

export default Page;
