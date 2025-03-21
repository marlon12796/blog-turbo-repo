'use client';
import { getPostLikes, likePostMutation, unlikePostMutation } from '@/lib/helpers/gqlQueries';
import { SessionUser } from '@/lib/helpers/session';
import { useMutation, useQuery } from '@urql/next';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  postId: number;
  user: SessionUser;
};

const LikePost = ({ postId, user }: Props) => {
  const variables = { postId, userLikedPost: postId };
  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: getPostLikes,
    variables
  });
  const [likePostMutationResult, likePost] = useMutation(likePostMutation);
  const [unlikePostMutationResult, unlikePost] = useMutation(unlikePostMutation);

  // Función para manejar el toggle de like/unlike
  const handleLikeToggle = async () => {
    if (!user.id) {
      toast.error('Debes iniciar sesión para dar like a una publicación.');
      return;
    }

    try {
      if (data?.userLikedPost) {
        await unlikePost({ postId, userLikedPost: user.id });
      } else {
        await likePost({ postId, userLikedPost: user.id });
      }
      reexecuteQuery({ requestPolicy: 'cache-and-network' });
    } catch (error) {
      toast.error('Ocurrió un error al procesar tu solicitud.');
    }
  };

  const isLiked = !!data?.userLikedPost;
  const likeCount = data?.postLikesCount || 0;

  return (
    <div className="mt-3 flex items-center justify-start gap-2">
      <button
        aria-label={isLiked ? 'Unlike' : 'Like'}
        aria-pressed={isLiked}
        onClick={handleLikeToggle}
        disabled={fetching || likePostMutationResult.fetching || unlikePostMutationResult.fetching}
        className="cursor-pointer focus:outline-none"
      >
        <Heart className={`w-6 transition-colors ${isLiked ? 'text-rose-600 fill-rose-600' : 'text-gray-600'}`} />
      </button>

      <p className="text-slate-600">{likeCount}</p>
    </div>
  );
};

export default LikePost;
