import { cn } from '@/lib/utils';
import { calculatePageNumbers } from '@/lib/utils/transform';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React from 'react';
type CommentsPaginationTypes = React.HTMLAttributes<HTMLDivElement> & {
  currentPage: number;
  totalPages: number;
  pageNeighbors?: number;
  onChangeCurrentPage: (page: number) => void;
};
const CommentsPagination = ({
  currentPage,
  totalPages,
  pageNeighbors,
  className,
  onChangeCurrentPage,
  ...rest
}: CommentsPaginationTypes) => {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPage,
    totalPages
  });
  return (
    <div className={cn(className, 'flex items-center justify-center cursor-pointer gap-2')} {...rest}>
      {currentPage > 1 && (
        <button onClick={() => onChangeCurrentPage(currentPage - 1)} className={cn('rounded-md bg-slate-200 py-2 px-2')}>
          <ChevronLeftIcon className="w-4" />
        </button>
      )}

      {pageNumbers.map((page, index) => (
        <button
          onClick={() => typeof page === 'number' && onChangeCurrentPage(page)}
          key={index}
          disabled={page === '...'}
          className={cn('px-3 py-1 rounded-md cursor-pointer transition hover:text-sky-600', {
            'bg-slate-200': currentPage !== page && page !== '...',
            'bg-blue-500 text-white': currentPage === page,
            'cursor-not-allowed': page === '...'
          })}
        >
          {page === '...' ? '...' : <span>{page}</span>}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onChangeCurrentPage(currentPage + 1)} className="rounded-md cursor-pointer bg-slate-200 py-2 px-2">
          <ChevronRightIcon className="w-4" />
        </button>
      )}
    </div>
  );
};

export default CommentsPagination;
