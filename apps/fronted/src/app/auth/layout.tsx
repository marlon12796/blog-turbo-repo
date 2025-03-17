import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <main className="flex items-center justify-center bg-slate-100"> {children}</main>;
};

export default AuthLayout;
