import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const MobileNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:hidden">
      <Sidebar triggerIcon={<Menu className="size-8" />} triggerClassName="absolute top-2 left-2">
        {children}
      </Sidebar>
    </div>
  );
};

export default MobileNavbar;
