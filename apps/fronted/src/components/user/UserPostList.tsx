import { Post } from '@/lib/types/modelTypes';
import PostListItem from './PostListItem';
import Pagination from '../Pagination';

const UserPostList = ({ posts, totalPages, currentPage }: { posts: Post[]; totalPages: number; currentPage: number }) => {
  return (
    <>
      <div className="bg-transparent w-full mt-2 text-center">
        <div className="mx-2 grid rounded-md text-left gap-3 px-2 grid-cols-8 py-3 shadow-md">
          <div className="col-span-1">Image</div>
          <div className="col-span-3">Descrition </div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Likes</div>
          <div className="col-span-1">Comments</div>
          <div className="col-span-1">Actions</div>
        </div>
      </div>
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default UserPostList;
