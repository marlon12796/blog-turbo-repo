import { createPostMutation, updatePostMutation } from '@/lib/helpers/gqlQueries';
import { uploadThumbnail } from '@/lib/helpers/upload';
import { PostFormSchemaType } from '@/lib/schemas/postForm.schema';
import { useMutation } from '@urql/next';
import { toast } from 'sonner';

export const usePostMutation = () => {
  const [createPostResult, createPost] = useMutation(createPostMutation);
  const [updatePostResult, updatePost] = useMutation(updatePostMutation);

  const onToggleSubmit = async (postData: PostFormSchemaType) => {
    try {
      const thumbnailLink = postData.thumbnail instanceof File ? await uploadThumbnail(postData.thumbnail) : postData.thumbnailUrl;
      const { thumbnailUrl, ...dataSubmit } = postData;
      void thumbnailUrl;
      const updatedPostData = { ...dataSubmit, thumbnail: thumbnailLink };
      if (!updatedPostData.postId) return;

      if (postData?.postId) {
        await updatePost({ updatePostInput: { postId: postData.postId, ...updatedPostData } });
        toast('Publicación actualizada', { description: 'Tu publicación se ha actualizado exitosamente.' });
      } else {
        await createPost({ createPostInput: updatedPostData });
        toast('Publicación creada', { description: 'Tu publicación se ha creado exitosamente.' });
      }
    } catch (error) {
      toast('Error', { description: 'Ocurrió un error al procesar tu solicitud.' });
    }
  };

  return { onToggleSubmit, createPostResult, updatePostResult };
};
