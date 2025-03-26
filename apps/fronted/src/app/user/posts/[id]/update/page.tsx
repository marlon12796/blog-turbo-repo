import UpsertPostForm from '@/components/user/UpsertPostForm';
import { fetchPostById } from '@/lib/actions/posts';
import { PostFormState } from '@/lib/types/formState';

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const UpdatePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(+params.id);
  const tags = (post.tags?.map((post) => post.name) ?? ['']).join(',');
  const data: PostFormState = {
    data: {
      content: post.content,
      postId: post.id,
      published: post.published,
      tags,
      thumbnailUrl: post.thumbnail ?? '',
      title: post.title
    },
    errors: {}
  };

  return (
    <div className='bg-white shadow-md rounded-md p-6 max-w-2xl w-full'>
      <h2 className='text-lg text-center font-bold text-slate-700'>Update Your Post</h2>
      <UpsertPostForm initialPost={data} />
    </div>
  );
};

export default UpdatePostPage;
