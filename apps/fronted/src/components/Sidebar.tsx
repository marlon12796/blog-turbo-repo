'use client';

import { useOnClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode, useRef, useState } from 'react';

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string;
}>;

const SideBar = (props: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);
  useOnClickOutside(ref, () => setShow(false));

  return (
    <>
      <button className={props.triggerClassName} onClick={() => setShow((prev) => !prev)}>
        {props.triggerIcon}
      </button>
      <div
        ref={ref}
        className={cn('w-60 absolute top-0 z-50 duration-300 transition-all bg-white rounded-r-md min-h-screen', {
          '-left-full': !show,
          'left-0': show
        })}
      >
        {props.children}
      </div>
    </>
  );
};

export default SideBar;
