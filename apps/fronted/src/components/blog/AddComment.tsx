import { useState } from 'react';
import { SessionUser } from '@/lib/helpers/session';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import { useMutation } from '@urql/next';
import { createCommentPost } from '@/lib/helpers/gqlQueries';
import { CommentFormSchema } from '@/lib/schemas/commentForm.schema';
import { Loader } from 'lucide-react';
export type CreateCommentFormState = {
  open: boolean;
  errors: {
    content?: string[];
    _form?: string[];
  };
};

const AddComment = ({ user, postId }: { user: SessionUser; postId: number }) => {
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);
  const [updateTodoResult, updateTodo] = useMutation(createCommentPost);
  const [errors, setErrors] = useState<CreateCommentFormState['errors']>({});
  const isLoading = updateTodoResult.fetching;
  const isDisabled = isLoading || !comment.trim() || (errors?.content?.length ?? 0) > 0;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = event.target.value;
    setComment(newComment);
    const validated = CommentFormSchema.safeParse({ content: newComment, postId: postId.toString() });
    if (!validated.success) {
      const errorContent = validated.error.flatten().fieldErrors.content;
      setErrors((prev) => ({ ...prev, content: errorContent ?? [] }));
    } else {
      setErrors((prev) => ({ ...prev, content: [] }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!comment.trim() || errors.content?.length) return;

    try {
      const result = await updateTodo({ createCommentInput: { content: comment, postId } });
      if (result.error) {
        setErrors((prev) => ({
          ...prev,
          _form: [result.error?.graphQLErrors[0]?.message ?? 'Error al enviar el comentario.']
        }));
        return;
      }
      setOpen(false);
      setComment('');
      setErrors({});
    } catch (error) {
      setErrors((prev) => ({ ...prev, _form: ['Ocurrió un error inesperado. Por favor, inténtalo más tarde.'] }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer text-sm h-fit">
          Add Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write Your Comment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid w-full gap-3">
            <Label htmlFor="comment-user">Your Comment</Label>
            <Textarea id="comment-user" placeholder="Type your comment here." value={comment} onChange={handleChange} />
            {errors.content?.[0] && <p className="text-red-500 animate-shake">{errors.content[0]}</p>}
            {errors._form?.[0] && <p className="text-red-500 animate-shake">{errors._form[0]}</p>}
          </div>
          <DialogFooter className="grid grid-flow-col items-center">
            <p className="p-2 text-sm text-slate-700">
              <span>Write as </span>
              <span>{user.name}</span>
            </p>
            <Button type="submit" disabled={isDisabled}>
              {isLoading ? <Loader className="animate-spin w-5 h-5" /> : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
