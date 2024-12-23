import { ArrowLeft } from 'iconsax-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchFriend } from '../hooks/user';
import Loading from '../components/Loading';
import { Avatar } from '../components/Avatar';
import Empty from '../components/Empty';

function FindUser() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const { mutate, data, isLoading } = useSearchFriend();
  const onSubmit = data => {
    mutate(data?.search);
  };
  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  return (
    <div className="px-2">
      <div className="sticky top-0 bg-white z-50">
        <div className="py-4 flex items-center gap-2">
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <p className="font-bold">Tìm bạn</p>
        </div>

        <form>
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
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Tìm bạn..."
              autoFocus
              {...register('search')}
            />
          </div>
        </form>
      </div>

      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data?.data?.data?.length === 0 ? (
              <Empty />
            ) : (
              <div>
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
                          {`${user?.follower} theo dõi`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FindUser;
