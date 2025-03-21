import { createCommentPost } from '@/lib/helpers/gqlQueries';
import { CommentFormSchema } from '@/lib/schemas/commentForm.schema';
import { commentFormReducer } from '@/reducers/comment.reducer';
import { useMutation } from '@urql/next';
import { useReducer } from 'react';
import { toast } from 'sonner';

export const useCommentForm = (postId: number, refreshComments: (goToFirstPage?: boolean) => void) => {
  const [state, dispatch] = useReducer(commentFormReducer, {
    comment: '',
    open: false,
    errors: {}
  });
  const { comment, errors } = state;
  const [createCommentResult, createComment] = useMutation(createCommentPost);
  const validateComment = (content: string) => {
    const validated = CommentFormSchema.safeParse({ content, postId: postId.toString() });

    dispatch({ type: 'SET_ERRORS', payload: validated.success ? {} : { content: validated.error.flatten().fieldErrors.content ?? [] } });
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_COMMENT', payload: event.target.value });
    validateComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const contentError = errors.content?.length ?? 0;
    if (!comment.trim() || contentError > 0) return;
    try {
      const result = await createComment({ createCommentInput: { content: comment, postId } });
      if (result.error) {
        dispatch({ type: 'SET_ERRORS', payload: { _form: [result.error?.graphQLErrors[0]?.message ?? 'Error al enviar el comentario.'] } });
        return;
      }
      dispatch({ type: 'RESET_FORM' });
      toast('Comentario agregado', { description: 'Tu comentario se ha publicado exitosamente.' });
      refreshComments(true);
    } catch {
      dispatch({ type: 'SET_ERRORS', payload: { _form: ['Ocurrió un error inesperado. Por favor, inténtalo más tarde.'] } });
    }
  };
  const toggleDialog = (isOpen: boolean) => {
    dispatch({ type: isOpen ? 'OPEN_DIALOG' : 'CLOSE_DIALOG' });
  };
  return { state, handleChange, handleSubmit, createCommentResult, toggleDialog };
};
