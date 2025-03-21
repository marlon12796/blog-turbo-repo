import { SessionUser } from '@/lib/helpers/session';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import { Loader } from 'lucide-react';
import { useCommentForm } from '@/hooks/useCommentForm';

const AddComment = ({
  user,
  postId,
  refreshComments
}: {
  user: SessionUser;
  postId: number;
  refreshComments: (goToFirstPage?: boolean) => void;
}) => {
  const { createCommentResult, handleChange, handleSubmit, state, toggleDialog } = useCommentForm(postId, refreshComments);
  const isLoading = createCommentResult.fetching;
  const errors = state.errors;
  const comment = state.comment;
  const isDisabled = createCommentResult.fetching || !state.comment.trim() || (state.errors.content?.length ?? 0) > 0;
  return (
    <Dialog open={state.open} onOpenChange={toggleDialog}>
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
