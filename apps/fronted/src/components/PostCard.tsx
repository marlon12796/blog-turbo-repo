import { Post } from '@/lib/types/modelTypes';
import { dataUrl } from '@/lib/utils/loader';
import Image from 'next/image';
import Link from 'next/link';
export const PostCard = ({ post }: { post: Post }) => {
  const { thumbnail, title, createdAt, content, id, slug } = post;
  return (
    <div className='bg-white rounded-lg shadow-md max-w-sm overflow-hidden flex m-auto h-full flex-col'>
      <div className='relative h-60 '>
        <Image
          src={thumbnail && typeof thumbnail === 'string' ? thumbnail : '/not-found-post.png'}
          alt={title ?? 'Post image'}
          width={400}
          height={400}
          quality={85}
          placeholder='blur'
          blurDataURL={dataUrl ?? '/placeholder.png'}
          className='object-cover flex absolute h-full'
          unoptimized={!thumbnail}
        />
      </div>
      <div className='p-6 flex-grow  flex flex-col'>
        <h3 className='text-lg font-bold mt-4 break-words text-center text-gray-600'>{title}</h3>
        <p className='mt-2 text-gray-500 text-sm '>{new Date(createdAt ?? '').toLocaleDateString()}</p>
        <p className='mt-4 text-gray-700 break-words'>{content?.slice(0, 100)}...</p>
        <Link className='text-indigo-600 hover:underline mt-auto text-right block' href={`/blog/${slug}-${id}`}>
          Read more
        </Link>
      </div>
    </div>
  );
};
