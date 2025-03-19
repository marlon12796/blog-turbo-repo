'use client';
import { useState } from 'react';
import { useQuery } from '@urql/next';
import { getCommentsByPostId } from '@/lib/helpers/gqlQueries';
import { CONFIG } from '@/constants';
import CommentCardSkeleton from './CommentCardSkeleton';
import { CommentEntity } from '@/lib/types/modelTypes';
import CommentCard from './CommentCard';

const Comments = ({ postId }: { postId: number }) => {
  const [page, setPage] = useState(1);
  const variables = {
    postId,
    offset: (page - 1) * CONFIG.PAGE_SIZE,
    limit: CONFIG.PAGE_SIZE
  };
  const [{ data, fetching, error }] = useQuery({ query: getCommentsByPostId, variables });
  const comments: CommentEntity[] = data?.comments;
  return (
    <div className="p-2 rounded-md shadow-md">
      <h3 className="text-lg text-slate-700 ">Comments</h3>
      <div className="flex flex-col gap-4">
        {fetching
          ? Array.from({ length: CONFIG.PAGE_SIZE }).map((_, index) => <CommentCardSkeleton key={index} />)
          : comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
};

export default Comments;
