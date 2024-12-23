import {
  Discover,
  Edit,
  Edit2,
  Home2,
  Logout,
  Menu,
  Message,
  Notification,
  Profile,
  ProfileCircle,
  Setting,
  Setting2,
  TrendUp,
  User,
} from 'iconsax-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/auth';
import Dropdown from 'rc-dropdown';

export default function MobileSidebar() {
  const { page } = useParams();
  if (page) return null;
  const { data: user } = useUser();
  return (
    <div className="fixed bottom-2 rounded-full right-1/2 translate-x-1/2 bg-white shadow z-50 py-2 px-8">
      <nav>
        <ul className="flex gap-4 items-center">
          <li className="p-2 hover:bg-gray-200 rounded-lg">
            <Link to="/timeline">
              <Home2 />
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-200 rounded-lg">
            <Link to="/explore">
              <TrendUp />
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-200 rounded-lg">
            <Link to="/messages">
              <Message />
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-200 rounded-lg">
            <Link to="/compose/post">
              <Edit />
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-200 rounded-lg">
            <Dropdown
              trigger={['click']}
              overlay={
                <div className="shadow rounded-lg bg-white overflow-hidden">
                  <ul>
                    <Link to={`/${user?.data?.data?.username}`}>
                      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm font-mono font-bold">
                        <User size={18} />
                        <p> Cá nhân</p>
                      </li>
                    </Link>

                    <Link to="/friends">
                      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm font-mono font-bold">
                        <ProfileCircle size={18} />
                        <p> Bạn bè</p>
                      </li>
                    </Link>
                    <Link to="/notifications">
                      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm font-mono font-bold">
                        <Notification size={18} />
                        <p> Thông báo</p>
                      </li>
                    </Link>
                    <Link to="/settings">
                      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm font-mono font-bold">
                        <Setting2 size={18} />
                        <p> Cài đặt</p>
                      </li>
                    </Link>

                    <Link to="/auth/logout">
                      <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm font-mono font-bold">
                        <Logout size={18} />
                        <p>Đăng xuất</p>
                      </li>
                    </Link>
                  </ul>
                </div>
              }
            >
              <Menu />
            </Dropdown>
          </li>
        </ul>
      </nav>
    </div>
  );
}
