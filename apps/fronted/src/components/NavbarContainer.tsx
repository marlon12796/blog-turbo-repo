import { PropsWithChildren } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

type Props = PropsWithChildren;
const NavbarContainer = (props: Props) => {
  return (
    <header className="sticky top-0">
      <DesktopNavbar>{props.children}</DesktopNavbar>
      <MobileNavbar>{props.children}</MobileNavbar>
    </header>
  );
};

export default NavbarContainer;
