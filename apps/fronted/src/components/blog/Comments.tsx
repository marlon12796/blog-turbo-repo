'use client';
import { CONFIG } from '@/constants';
import CommentCardSkeleton from './CommentCardSkeleton';
import CommentCard from './CommentCard';
import CommentsPagination from './CommentsPagination';
import { useComments } from '@/hooks/useComments';
import { SessionUser } from '@/lib/helpers/session';
import AddComment from './AddComment';

const Comments = ({ postId, pageSize, sessionUser }: { postId: number; pageSize: number; sessionUser: SessionUser | null }) => {
  const { comments, totalPages, page, fetching, handleCurrentPage } = useComments({ postId, pageSize });
  return (
    <div className="px-4 py-3 rounded-md shadow-md">
      <div className="flex items-center gap-4 mb-2">
        <h3 className="text-lg text-slate-700 ">Comments</h3>
        {sessionUser && <AddComment user={sessionUser} postId={postId} />}
      </div>
      <div className="flex flex-col gap-4">
        {fetching
          ? Array.from({ length: CONFIG.COMMENTS_SIZE }).map((_, index) => <CommentCardSkeleton key={index} />)
          : comments?.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
      </div>
      {totalPages > 1 && (
        <CommentsPagination onChangeCurrentPage={handleCurrentPage} className="pt-2" currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Comments;
