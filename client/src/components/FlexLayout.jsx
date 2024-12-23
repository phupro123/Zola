import SideBar from '../parts/Sidebar';
import { useMediaQuery } from 'react-responsive';
import MobileSidebar from '../parts/Sidebar/MobileSidebar';

export default function FlexLayout({ children }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  return (
    <div className="flex">
      {isDesktopOrLaptop ? <SideBar /> : <MobileSidebar />}
      {children}
    </div>
  );
}
