import { SessionUser } from '@/lib/helpers/session';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';

const AddComment = ({ user, postId }: { user: SessionUser; postId: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer text-sm  h-fit">
          Add Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write Your Comment</DialogTitle>
        </DialogHeader>
        <form action="" className="grid gap-3">
          <div className="grid w-full gap-3">
            <Label htmlFor="comment-user">Your Comment</Label>
            <Textarea placeholder="Type your comment here." id="comment-user" />
          </div>
          <DialogFooter className="grid grid-flow-col items-center">
            <p className="p-2 text-sm text-slate-700">
              <span>Write as </span>
              <span>{user.name}</span>
            </p>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
