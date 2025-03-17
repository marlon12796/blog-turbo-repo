import { fetchPostById } from '@/lib/actions/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const postSlug = (await params).slug;
  const id = postSlug.split('-').at(-1);
  if (!id) notFound();

  const post = await fetchPostById(+id);
  return (<></>)
};

export default PostPage;
