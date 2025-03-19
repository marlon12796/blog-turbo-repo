import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Session } from '@/lib/helpers/session';
import { List, LogOut, Pencil } from 'lucide-react';
import Link from 'next/link';
const Profile = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-10 rounded-full">
          <AvatarImage src={session.user.avatar} alt={session.user.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[100] relative right-2" side={'bottom'} align="start" sideOffset={4}>
        <DropdownMenuLabel className="py-0 pr-4 font-normal">
          <div className="flex items-center gap-2  py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={session.user.avatar} alt={session.user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{session.user.name}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <form action="/api/auth/signout" method="POST">
            <DropdownMenuItem asChild>
              <button type="submit" className="flex w-full items-center gap-2">
                <LogOut className="w-4" />
                <span>Sign Out</span>
              </button>
            </DropdownMenuItem>
          </form>
          <Link href="/user/create-post">
            <DropdownMenuItem>
              <Pencil className="w-4" />
              <span>Create New Post</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/user/posts">
            <DropdownMenuItem>
              <List className="w-4" />
              <span>Posts</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
