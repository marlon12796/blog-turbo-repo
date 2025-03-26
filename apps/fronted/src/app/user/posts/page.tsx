import NoPosts from '@/components/user/NoPosts';
import UserPostList from '@/components/user/UserPostList';
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
  const totalPosts = Math.ceil(countUserPosts / CONFIG.PAGE_SIZE);
  const isNoutFoundPosts = posts.length === 0 || countUserPosts === 0;
  return <>{isNoutFoundPosts ? <NoPosts /> : <UserPostList posts={posts} currentPage={page} totalPages={totalPosts} />}</>;
};

export default page;
