import UpsertPostForm from '@/components/user/UpsertPostForm';

const page = () => {
  return (
    <div className='shadow-md rounded-md p-6 max-w-2xl w-full'>
      <h2 className='text-lg text-center font-bold text-slate-700'>Create a New Post</h2>
      {/* <CreatePostContainer /> */}
      <UpsertPostForm />
    </div>
  );
};

export default page;
