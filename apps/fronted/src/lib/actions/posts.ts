'use server';
import { getPostByIdQuery, getPostsQuery } from '@/lib/helpers/gqlQueries';
import { getClient } from '@/lib/helpers/urqlClient';
import { Post } from '../types/modelTypes';
import { transformLimitOffset } from '../utils/transform';

const fetchUserPosts = async ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) => {
  const { limit, offset } = transformLimitOffset({ page, pageSize });

  const result = await getClient().query(getPostsQuery, { limit, offset });
  const data: { posts: Post[]; postCount: number } = result.data;

  return {
    posts: data.posts,
    totalPosts: data.postCount
  };
};
const fetchPostById = async (id: number) => {
  const result = await getClient().query(getPostByIdQuery, { postId: id });
  const data: Post = result.data.post;
  return data;
};

export { fetchUserPosts, fetchPostById };
