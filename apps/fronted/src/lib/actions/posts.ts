'use server';
import { deletePostMutation, getPostByIdQuery, getPostsQuery, getUserPosts } from '@/lib/helpers/gqlQueries';
import { getClient, publicClient } from '@/lib/helpers/urqlClient';
import { Post } from '../types/modelTypes';
import { transformLimitOffset } from '../utils/transform';

const fetchPosts = async ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) => {
  const { limit, offset } = transformLimitOffset({ page, pageSize });

  const result = await publicClient.query(getPostsQuery, { limit, offset });
  const data: { getAllPosts: Post[]; countAllPosts: number } = result.data;

  return {
    posts: data?.getAllPosts ?? [],
    totalPosts: data?.countAllPosts ?? 0
  };
};
const fetchPostById = async (id: number) => {
  const result = await publicClient.query(getPostByIdQuery, { postId: id });
  const data: Post = result.data.getPostById;
  return data;
};
const fetchUserPosts = async ({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) => {
  const { limit, offset } = transformLimitOffset({ page, pageSize });

  const result = await (await getClient()).query(getUserPosts, { limit, offset });
  const data: { getUserPosts: Post[]; countUserPosts: number } = result.data;
  return {
    posts: data.getUserPosts,
    countUserPosts: data.countUserPosts
  };
};
const deleteUserPost = async (postId: number) => {
  const result = await (await getClient()).mutation(deletePostMutation, { postId });
  return result;
};
export { fetchPosts, fetchPostById, fetchUserPosts, deleteUserPost };
