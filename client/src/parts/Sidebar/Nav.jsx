import {
  Notification,
  Message,
  ProfileCircle,
  Profile,
  TrendUp,
  Home3,
} from 'iconsax-react';
import { AddPost } from './AddPost';
import { Anchor } from './Anchor';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/auth';
import { useCountUnread } from '../../hooks/noti';
function Nav() {
  const { data } = useUser();

  const { data: noti } = useCountUnread();
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const tabs = [
    {
      name: 'Trang chủ',
      path: 'timeline',
      icon: <Home3 variant={path === 'timeline' ? 'Bold' : 'Outline'} />,
    },
    {
      name: 'Khám phá',
      path: 'explore',
      icon: <TrendUp variant={path === 'explore' ? 'Bold' : 'Outline'} />,
    },
    {
      name: 'Nhắn tin',
      path: 'messages',
      icon: <Message variant={path === 'messages' ? 'Bold' : 'Outline'} />,
      // badges: 2,
    },
    {
      name: 'Thông báo',
      path: 'notifications',
      icon: (
        <Notification variant={path === 'notifications' ? 'Bold' : 'Outline'} />
      ),
      badges: noti?.data?.data,
    },

    {
      name: 'Bạn bè',
      path: 'friends',
      icon: <ProfileCircle variant={path === 'friends' ? 'Bold' : 'Outline'} />,
    },
    {
      name: 'Cá nhân',
      path: data?.data?.data?.username,
      icon: (
        <Profile
          variant={path === data?.data?.data?.username ? 'Bold' : 'Outline'}
        />
      ),
    },
  ];

  return (
    <nav className="flex flex-col text-lg justify-center gap-4 xl:pl-4">
      {tabs.map((tab, index) => {
        return <Anchor key={index} {...tab} />;
      })}
      <AddPost />
    </nav>
  );
}
export default Nav;
