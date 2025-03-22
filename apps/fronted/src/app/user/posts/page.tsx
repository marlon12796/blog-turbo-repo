import NoPosts from '@/components/user/NoPosts';
import { CONFIG } from '@/constants';
import { fetchUserPosts } from '@/lib/actions/posts';

type PostsUserTypes = {
  searchParams?: Promise<{
    limit?: string;
    page?: string;
  }>;
};
const page = async ({ searchParams }: PostsUserTypes) => {
  const params = await searchParams;
  const limit = parseInt(params?.limit ?? CONFIG.PAGE_SIZE.toString());
  const page = parseInt(params?.page ?? '1');
  const { posts, countUserPosts } = await fetchUserPosts({ page, pageSize: limit });
  const isNoutFoundPosts = posts.length === 0 || countUserPosts === 0;
  return <>{isNoutFoundPosts ? <NoPosts /> : posts.map((post) => <p key={post.id}>{post.title}</p>)}</>;
};

export default page;
