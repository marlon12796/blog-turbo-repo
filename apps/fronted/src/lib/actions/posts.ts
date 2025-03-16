'use server';
import { getPostsQuery } from '@/lib/gqlQueries';
import { getClient } from '@/lib/urqlClient';
import { Post } from '../types/modelTypes';

export async function fetchUserPosts({ page, pageSize = 10 }: { page?: number; pageSize?: number }) {
  // const { take, skip } = transformTakeSkip({ page, pageSize });

  const result = await getClient().query(getPostsQuery, {});
  const data: { posts: Post[] } = result.data;
  // console.log('HERE', posts?.posts);

  return {
    posts: data.posts
    // totalPosts: data.userPostCount as number
  };
}
