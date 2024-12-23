import _ from 'lodash';
import { ArrowLeft } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFriend } from '../../hooks/user';
import Loading from '../../components/Loading';
import Empty from '../../components/Empty';
import { Avatar } from '../../components/Avatar';
import { useForm } from 'react-hook-form';
import { useCreateRoom } from '../../hooks/chat';

export default function ChatNew() {
  const navigate = useNavigate();
  const { data, isLoading } = useFriend();
  const { mutate } = useCreateRoom();
  const defaultValues = {
    name: '',
    isRoom: true,
    users: [],
  };
  const { register, handleSubmit } = useForm({ defaultValues });
  const onSubmit = data => {
    mutate(data);
  };
  return (
    <div>
      <div className="flex items-center justify-between py-4 gap-2 px-2">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </button>
          <p className="font-bold">Tạo nhóm mới</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2 max-w-2xl mx-auto px-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-bold bg-blue-600 text-white text-sm ml-auto block hover:bg-blue-700 transition-colors duration-150"
          >
            Tạo nhóm
          </button>
          <label htmlFor="name" className="font-bold">
            Tên nhóm
          </label>

          <input
            type="text"
            id="name"
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            placeholder="Tên nhóm..."
            {...register('name', { required: true })}
          />

          <div className="border-gray-100">
            <p className="mt-4 font-bold">Danh sách bạn bè</p>
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {data?.data?.data?.length === 0 ? (
                    <Empty />
                  ) : (
                    <>
                      {data?.data?.data?.map(user => {
                        return (
                          <div
                            className="flex justify-between items-center mb-4"
                            key={user?._id}
                          >
                            <div className="flex py-2 items-center gap-2">
                              <Avatar
                                src={user?.avatarUrl}
                                status={user?.status === 'online'}
                              />
                              <div>
                                <Link to={`/${user?.username}`}>
                                  <p className="font-bold hover:underline">
                                    {user?.fullname}
                                  </p>
                                </Link>
                                <p className="text-gray-600 text-sm">
                                  @{user?.username}
                                </p>
                              </div>
                            </div>
                            <label
                              className="w-20 h-8 flex justify-center items-center select-none relative text-white text-sm font-bold rounded-lg overflow-hidden cursor-pointer"
                              htmlFor={user?._id}
                            >
                              <input
                                type="checkbox"
                                name="users"
                                value={user?._id}
                                id={user?._id}
                                className="peer"
                                {...register('users', { required: true })}
                              />
                              <p
                                className="opacity-0 peer-checked:opacity-100 absolute p-4 min-w-max bg-blue-600"
                                id={user?._id}
                              >
                                Đã chọn
                              </p>
                              <p
                                className="opacity-100 peer-checked:opacity-0 absolute p-4 min-w-max bg-gray-100 text-black"
                                id={user?._id}
                              >
                                Mời vào
                              </p>
                            </label>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
