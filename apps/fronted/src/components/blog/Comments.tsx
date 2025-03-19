'use client';
import { CONFIG } from '@/constants';
import CommentCardSkeleton from './CommentCardSkeleton';
import CommentCard from './CommentCard';
import CommentsPagination from './CommentsPagination';
import { useMounted } from '@/hooks/useMounted';
import { useComments } from '@/hooks/useComments';

const Comments = ({ postId, pageSize }: { postId: number; pageSize: number }) => {
  const mounted = useMounted();
  const { comments, totalPages, page, fetching, handleCurrentPage } = useComments({ postId, pageSize });
  return (
    <div className="p-2 rounded-md shadow-md">
      <h3 className="text-lg text-slate-700">Comments</h3>
      <div className="flex flex-col gap-4">
        {fetching
          ? Array.from({ length: CONFIG.COMMENTS_SIZE }).map((_, index) => <CommentCardSkeleton key={index} />)
          : comments?.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
      </div>
      {totalPages > 1 && (
        <CommentsPagination onChangeCurrentPage={handleCurrentPage} className="p-2" currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
};

export default Comments;
