import { Post } from '@/lib/types/modelTypes';
import { PostCard } from './PostCard';
import Pagination from './Pagination';
import { PaginationTypes } from '@/lib/utils/transform';

type PostsType = Omit<PaginationTypes, 'pageNeighbors'> & {
  posts: Post[];
};
const Posts = async ({ posts, currentPage, totalPages }: PostsType) => {
  return (
    <section className="container m-8 max-w-5xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-gray-600  leading-tight">Latest Posts</h2>
      <div className="h-1 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
};

export default Posts;
