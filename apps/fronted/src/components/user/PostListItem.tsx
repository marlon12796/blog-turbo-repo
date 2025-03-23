import { Post } from '@/lib/types/modelTypes';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/Tooltip';
import PostActions from './PostActions';

type Props = {
  post: Post;
};

const PostListItem = ({ post }: Props) => {
  return (
    <div
      className={`grid grid-cols-8 m-2 overflow-hidden rounded-md gap-3 min-h-44 items-center border shadow hover:scale-[101%] transition text-center bg-white relative ${
        !post.published ? 'opacity-50 grayscale' : ''
      }`}
    >
      <div className="relative h-full w-full col-start-1 col-span-1">
        <Image
          src={post.thumbnail || '/no-image.png'}
          className="size-full  object-cover"
          alt={post.title}
          width={500}
          height={500}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col text-left gap-2 col-start-2 col-span-3">
        <p className="text-lg text-balance text-slate-700">{post.title}</p>
        <p className="text-sm line-clamp-5  text-pretty text-slate-500">{post.content}</p>
      </div>

      <p className="text-left">{new Date(post.createdAt).toLocaleDateString()}</p>

      <p className="text-left">{post._count.totalLikes}</p>

      <p className="text-left">{post._count.totalComments}</p>
      <PostActions postId={post.id} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex justify-center items-center absolute right-0 m-2 top-1">
              {post.published ? <Eye className="size-5 text-green-800" /> : <EyeOff className="size-5 text-red-500" />}
            </div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{post.published ? 'Published' : 'Unpublished'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PostListItem;
