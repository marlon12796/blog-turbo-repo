import { useCallback, useState } from 'react';
import { useQuery } from '@urql/next';
import { transformLimitOffset } from '@/lib/utils/transform';
import { getCommentsByPostId } from '@/lib/helpers/gqlQueries';
import { CommentEntity } from '@/lib/types/modelTypes';

export const useComments = ({ postId, pageSize }: { postId: number; pageSize: number }) => {
  const [page, setPage] = useState(1);
  const resultTransform = transformLimitOffset({ page, pageSize });
  const variables = {
    postId,
    commentCountPostId: postId,
    ...resultTransform
  };
  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: getCommentsByPostId,
    variables
  });
  const comments: CommentEntity[] = data?.comments || [];
  const commentsCount: number = data?.commentCount || 0;
  const totalPages = Math.ceil(commentsCount / pageSize);
  const handleCurrentPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };
  const refreshComments = useCallback(
    (goToFirstPage = false) => {
      if (goToFirstPage) setPage(1);
      reexecuteQuery({ requestPolicy: 'network-only' });
    },
    [reexecuteQuery]
  );

  return {
    comments,
    commentsCount,
    totalPages,
    page,
    fetching,
    handleCurrentPage,
    refreshComments
  };
};
