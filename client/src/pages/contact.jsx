import { useEffect } from 'react';
import Empty from '../components/Empty';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { useFriend, useSuggestFriend } from '../hooks/user';
import { ArrowLeft2 } from 'iconsax-react';
import { APP_NAME } from '../configs';
import ActionFollowButton from '../components/ActionFollowButton';

export default function ContactPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useFriend();

  const { data: friendSuggest } = useSuggestFriend();
  useEffect(() => {
    document.title = `${APP_NAME} | Danh bạ`;
  }, []);
  return (
    <div className="flex w-full mx-auto lg:max-w-5xl gap-8 flex-col lg:flex-row">
      <div className="grow lg:max-w-xl mx-auto w-full px-2">
        <div className="sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center py-4 justify-between">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => navigate(-1)}>
                <ArrowLeft2 size={18} variant="Outline" />
              </button>

              <p className="font-bold">Bạn bè</p>
            </div>
            <Link to="/user/find"></Link>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Tìm bạn..."
              onFocus={() => navigate('/friends/find')}
            />
          </div>
        </div>

        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {data?.data?.data?.length === 0 ? (
                <Empty />
              ) : (
                <>
                  {data?.data?.data?.map(user => (
                    <div className="my-10" key={user?._id}>
                      <div className="flex gap-2 items-center">
                        <div className="flex">
                          <Avatar src={user?.avatarUrl} status={user?.status} />
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold">{user?.fullname}</p>

                          <span className="text-sm text-gray-700 font-normal">
                            <Link
                              to={`/${user?.username}`}
                              className="hover:underline"
                            >
                              @{user?.username} &#8226;
                            </Link>
                            {`${user?.follower?.length} theo dõi`}
                          </span>
                        </div>
                        <ActionFollowButton username={user?.username} />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="p-4 sticky top-0">
        <p className="font-bold py-4">Gợi ý kết bạn</p>
        {friendSuggest?.data?.data?.length === 0 ? (
          <Empty />
        ) : (
          <>
            {friendSuggest?.data?.data?.map(user => {
              return (
                <div className="mb-8">
                  <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar src={user?.avatarUrl} />
                      <div>
                        <p className="font-bold">{user?.fullname}</p>
                        <Link
                          to={`/${user?.username}`}
                          className="text-sm text-gray-500 line-clamp-1"
                        >
                          <p className="hover:underline line-clamp-1">
                            @{user?.username}
                          </p>
                        </Link>

                        <span className="h-1 w-1 rounded-full bg-gray-700 mx-2 inline-block" />
                        <span className="text-sm text-gray-400">
                          {user?.follower?.length} theo dõi
                        </span>
                      </div>
                    </div>
                    <div>
                      <ActionFollowButton username={user?.username} />
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
