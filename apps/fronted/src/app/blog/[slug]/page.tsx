import { fetchPostById } from '@/lib/actions/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import SanitizedContent from '@/components/blog/SanitizedContent';
import Comments from '@/components/blog/Comments';
import { CONFIG } from '@/constants';
import { getSession } from '@/lib/helpers/session';
import LikePost from '@/components/blog/LikePost';

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const postSlug = (await params).slug;
  const id = postSlug.split('-').at(-1);
  const totalComments = CONFIG.COMMENTS_SIZE;
  if (!id) notFound();
  const session = await getSession();
  const post = await fetchPostById(+id);
  return (
    <main className="container mx-auto px-4 py-8 mt-2">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">{post.title}</h1>
      <p className="text-slate-500 text-sm mb-4">
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="relative w-80 h-60">
        <Image src={post.thumbnail ?? '/no-image.png'} alt={post.title} fill className="rounded-md object-cover" />
      </div>
      <SanitizedContent content={post.content} />
      {session?.user && <LikePost postId={post.id} user={session.user} />}
      <Comments postId={parseInt(id)} pageSize={totalComments} sessionUser={session?.user ?? null} />
    </main>
  );
};

export default PostPage;
