import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;
const PostsLayout = ({ children }: Props) => {
  return <main className="mt-24 flex flex-col justify-center items-center">{children}</main>;
};

export default PostsLayout;
