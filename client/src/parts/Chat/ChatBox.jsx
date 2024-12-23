import _ from 'lodash';
import { AddSquare, Menu, UserAdd } from 'iconsax-react';
import { Link, useParams } from 'react-router-dom';
import Dropdown from 'rc-dropdown';
import { useChat, useGetAllRoom } from '../../hooks/chat';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';
import ChatSkeleton from '../../components/ChatSkeleton';
import { Avatar } from '../../components/Avatar';

function ChatMenu() {
  return (
    <ul className="bg-white shadow rounded-lg text-sm overflow-hidden">
      <Link to="/messages/new">
        <li className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50">
          <AddSquare size={18} />
          Thêm nhóm
        </li>
      </Link>
      <Link to="/friends/find">
        <li className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50">
          <UserAdd size={18} />
          Kết bạn
        </li>
      </Link>
    </ul>
  );
}
export default function ChatBox() {
  const { data, isLoading } = useGetAllRoom();
  const { page } = useParams();
  useChat();
  return (
    <div className="border-r lg:w-96 w-full">
      <div className="flex justify-between items-center w-full p-4">
        <p className="font-bold">Nhắn tin</p>
        <Dropdown trigger={['click']} overlay={<ChatMenu />}>
          <button type="button">
            <Menu size={16} variant="Bulk" />
          </button>
        </Dropdown>
      </div>
      <p className="font-bold px-4">Tất cả</p>
      <div className="h-3/4 overflow-scroll scrollbar-hide w-full px-2">
        {isLoading ? (
          <Loading />
        ) : (
          // <ChatSkeleton />
          <>
            {data?.data?.Rooms?.length === 0 ? (
              <Empty />
            ) : (
              <>
                {data?.data?.Rooms?.map(room => {
                  return (
                    <Link to={`/messages/${room?._id}`} key={room?._id}>
                      <div
                        className={`flex items-center gap-2 hover:bg-gray-50 p-4 rounded-lg my-2 ${
                          page === room?._id && 'bg-gray-50'
                        }`}
                      >
                        <Avatar src={room?.users[0].avatarUrl} />
                        <div>
                          <p className="font-semibold hover:underline">
                            {room?.isRoom
                              ? `#${room?.name}`
                              : room?.users[0]?.fullname}
                          </p>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {`${room?.last_message?.sender_fullname} : ${
                              room?.last_message?.content
                            } ${formatDistanceToNow(
                              new Date(room?.last_message?.created_at),
                              {
                                locale: vi,
                              },
                            )}`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
