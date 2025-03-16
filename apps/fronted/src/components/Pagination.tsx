import { cn } from '@/lib/utils';
import { calculatePageNumbers, PaginationTypes } from '@/lib/utils/transform';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

type PaginationProps = React.HTMLAttributes<HTMLDivElement> & PaginationTypes;

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, pageNeighbors = 4, className, ...rest }) => {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPage,
    totalPages
  });

  return (
    <div className={cn('flex items-center justify-center gap-2', className)} {...rest}>
      {currentPage > 1 && (
        <button className={cn('rounded-md bg-slate-200 py-2 px-2')}>
          <Link
            href={{
              pathname: '/',
              query: { page: currentPage - 1 }
            }}
            scroll={false}
          >
            <ChevronLeftIcon className="size-4" />
          </Link>
        </button>
      )}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={cn('px-3 py-1 rounded-md transition hover:text-sky-600', {
            'bg-slate-200': currentPage !== page && page !== '...',
            'bg-blue-500 text-white': currentPage === page,
            'cursor-not-allowed': page === '...'
          })}
        >
          {page === '...' ? (
            '...'
          ) : (
            <Link href={`?page=${page}`} scroll={false}>
              {page}
            </Link>
          )}
        </button>
      ))}
      {currentPage < totalPages && (
        <button className="rounded-md bg-slate-200 py-2 px-2">
          <Link
            href={{
              pathname: '/',

              query: { page: currentPage + 1 }
            }}
            scroll={false}
          >
            <ChevronRightIcon className="size-4" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Pagination;
