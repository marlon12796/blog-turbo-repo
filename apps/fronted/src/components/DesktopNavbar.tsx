import { cn } from '@/lib/utils';

const DesktopNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav
      className={cn('hidden relative from-sky-500 to-indigo-500 bg-gradient-to-br transition-colors w-full z-50 text-white top-0 md:block')}
    >
      <div className="flex items-center w-full px-4 py-4 mx-auto container">{children}</div>
    </nav>
  );
};

export default DesktopNavbar;
