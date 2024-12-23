import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowLeft2, CloseCircle } from 'iconsax-react';
import {
  useCountUnread,
  useDeleteNoti,
  useNoti,
  useReadNoti,
} from '../hooks/noti';
import { Avatar } from '../components/Avatar';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import Loading from '../components/Loading';
import parse from 'html-react-parser';
import Empty from '../components/Empty';
import { APP_NAME } from '../configs';

export default function NotifyPage() {
  const navigate = useNavigate();
  const { tab } = useParams();

  const { data, isLoading } = useNoti({
    filter: tab === 'unread' ? tab : 'all',
  });

  const { mutate: readNoti } = useReadNoti(tab === 'unread' ? tab : 'all');
  const { data: notiUnread, isLoading: loadingUnread } = useCountUnread();
  const { mutate } = useDeleteNoti(tab === 'unread' ? tab : 'all');
  useEffect(() => {
    document.title = `${APP_NAME} | Thông báo`;
  }, []);
  return (
    <div className="px-2">
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center py-4 justify-between">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => navigate(-1)}>
              <ArrowLeft2 size={18} variant="Outline" />
            </button>
            <p className="font-bold">Thông báo</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={`/notifications`}
            className={`grow py-3 text-center hover:bg-gray-50 rounded-lg ${
              tab === undefined && 'bg-gray-50 font-bold'
            } `}
          >
            Tất cả
            <span className="w-1.5 h-1.5 rounded-full bg-black inline-block ml-2" />
            <span className="text-gray-500 text-sm font-normal">
              {isLoading ? '' : ` ${data?.data?.pagination?.total}`}
            </span>
          </Link>
          <Link
            to={`/notifications/unread`}
            className={`grow py-3 text-center hover:bg-gray-50 rounded-lg ${
              tab === 'unread' && 'bg-gray-50 font-bold'
            } `}
          >
            Chưa đọc
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block ml-2" />
            <span className="text-gray-500 text-sm font-normal">
              {loadingUnread ? '' : ` ${notiUnread?.data?.data}`}
            </span>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {data?.data?.data?.length == 0 ? (
            <Empty />
          ) : (
            <>
              {data?.data?.data?.map(noti => {
                return (
                  <div
                    className={`flex gap-2 p-4 my-8 rounded-lg hover:bg-gray-50 transition-colors duration-150 relative group ${
                      !noti?.isRead && ''
                    }`}
                    key={noti?._id}
                  >
                    <button
                      type="button"
                      className="text-red-400 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      onClick={() => mutate(noti?._id)}
                    >
                      <CloseCircle size={16} variant="Bulk" />
                    </button>
                    <div>
                      <Avatar src={noti?.author?.avatarUrl} />
                    </div>
                    <div>
                      <p>
                        <Link
                          to={`/${noti?.author?.username}`}
                          className="hover:underline font-semibold"
                        >
                          @{noti?.author?.username}
                        </Link>
                        <span className="text-sm text-gray-400 font-normal">
                          &nbsp;&#8226;&nbsp;
                          {formatDistanceToNow(new Date(noti?.createdAt), {
                            locale: vi,
                            addSuffix: true,
                          })}
                        </span>
                        {!noti?.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block mx-2" />
                        )}
                      </p>
                      <Link
                        to={`/${noti?.author?.username}/post/${noti?.postId?._id}`}
                        onClick={() => readNoti(noti?._id)}
                      >
                        <p className="line-clamp-1 hover:underline">
                          {parse(`${noti.message} : ${noti?.postId?.content}`)}
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}
