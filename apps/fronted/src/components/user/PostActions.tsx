import React from 'react';
import { TooltipContent, Tooltip, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { TooltipArrow } from '@radix-ui/react-tooltip';

const PostActions = ({ postId, title }: { postId: number; title: string }) => {
  return (
    <div className='flex justify-start items-center gap-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className='border p-2 border-yellow-500 rounded-md text-yellow-500 hover:border-yellow-700  hover:text-yellow-700 transition-colors'
              href={`/user/posts/${postId}/update`}
            >
              <PencilIcon className='size-4' />
            </Link>
          </TooltipTrigger>
          <TooltipContent className='bg-yellow-700 fill-yellow-700' sideOffset={3}>
            <p>Edit This Post</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className=''>
            <Link
              className='border p-2 border-red-500 rounded-md text-red-500 hover:border-red-700  hover:text-red-700 transition-colors'
              href={`/user/posts/${postId}/delete?title=${encodeURIComponent(title)}`}
            >
              <TrashIcon className='size-4' />
            </Link>
          </TooltipTrigger>
          <TooltipContent className='bg-red-500 fill-red-500 text-white' sideOffset={3}>
            <p>Delete This Post</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PostActions;
