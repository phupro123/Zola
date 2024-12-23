import React from 'react';
import { useFriend } from '../../hooks/user';
import { Avatar } from '../../components/Avatar';
import { useForm } from 'react-hook-form';
import { ArrowLeft2 } from 'iconsax-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAddUserToRoom } from '../../hooks/chat';

export default function ChatInvite() {
  const { data } = useFriend();
  const { page } = useParams();
  const { mutate: addUserToRoom } = useAddUserToRoom(page);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = data => {
    addUserToRoom({
      roomId: page,
      users: data?.users,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-2xl mx-auto px-2">
        <div className="flex items-center gap-2 py-4 justify-between">
          <div className="flex items-center gap-2">
            <button type="button">
              <ArrowLeft2 size={18} onClick={e => navigate(-1)} />
            </button>
            <p className="font-bold">Bạn bè</p>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-black font-bold text-sm text-white"
          >
            Xác nhận
          </button>
        </div>
        {data?.data?.data?.map(user => {
          return (
            <div className="flex gap-2 items-center py-4 justify-between mb-4">
              <div className="flex items-center gap-2">
                <Avatar src={user?.avatarUrl} />
                <div>
                  <p className="font-bold">{user?.fullname}</p>
                  <Link to={`/${user?.username}`}>
                    <p className="text-sm text-gray-300 hover:underline">
                      @{user?.username}
                    </p>
                  </Link>
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
                  {...register('users')}
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
      </div>
    </form>
  );
}
