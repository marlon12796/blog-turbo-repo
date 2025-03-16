'use server';
import { getPostsQuery } from '@/lib/helpers/gqlQueries';
import { getClient } from '@/lib/helpers/urqlClient';
import { Post } from '../types/modelTypes';
import { transformLimitOffset } from '../utils/transform';

export async function fetchUserPosts({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const { limit, offset } = transformLimitOffset({ page, pageSize });

  const result = await getClient().query(getPostsQuery, { limit, offset });
  const data: { posts: Post[] } = result.data;

  return {
    posts: data.posts
    // totalPosts: data.userPostCount as number
  };
}
