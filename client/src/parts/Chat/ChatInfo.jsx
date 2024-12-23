import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { ArrowLeft, Profile } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import {
  useDeleteRoom,
  useGroupInfo,
  useLeaveGroup,
  useRemoveUserOfRoom,
  useRenameGroup,
  useUserInRoom,
} from '../../hooks/chat';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../../hooks/auth';

export default function ChatInfo() {
  const { page } = useParams();
  const navigate = useNavigate();

  const { data } = useGroupInfo(page);
  const { data: currentUser } = useUser();
  const { data: userOfRoom } = useUserInRoom(page);
  const { mutate } = useRenameGroup(page);
  const { mutate: leaveGroup } = useLeaveGroup(page);
  const { mutate: deleteRoom } = useDeleteRoom();
  const { mutate: removeUserOfRoom } = useRemoveUserOfRoom(page);
  const [rename, setRename] = useState(false);
  const submit = useRef();
  const defaultValues = {
    name: data?.data?.room?.name,
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues,
  });

  const onSubmit = data => {
    const payload = {
      id: page,
      name: data?.name,
    };
    mutate(payload);
  };

  useEffect(() => {
    setValue('name', data?.data?.room?.name);
  }, [data]);
  console.log(data?.data?.room);
  return (
    <div className="px-2">
      <div className="sticky top-0 z-20 flex items-center justify-between gap-2 bg-white py-4 w-full">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </button>
          <p className="font-bold">Thông tin nhóm</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-2 items-center justify-between mb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
            <div className="flex items-center gap-2 py-2 w-full justify-end">
              <button
                className="text-sm"
                type="button"
                onClick={() => setRename(state => !state)}
              >
                {rename ? 'Hủy' : ' Đổi tên'}
              </button>
              {rename && (
                <button
                  className="text-sm font-bold py-2 px-4 bg-black text-white rounded-lg transition-colors duration-150 block"
                  type="button"
                  onClick={() => submit.current.click()}
                >
                  Lưu
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                id="name"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none disabled:border-none disabled:bg-transparent font-bold beer disabled:pl-0 disabled:text-2xl"
                placeholder="Tên nhóm..."
                maxLength={45}
                disabled={!rename}
                {...register('name', { required: true })}
              />
            </div>
            <button type="submmit" className="hidden" ref={submit} />
          </form>
        </div>

        <div className="">
          <div className="flex items-center gap-2">
            <span className="font-bold">Thành viên</span>
            <div className="flex items-center">
              <Profile size="12" />
              <span className="font-normal text-sm text-gray-400">
                {userOfRoom?.data?.user?.length}
              </span>
            </div>
          </div>
          {userOfRoom?.data?.user?.map(user => {
            return (
              <div className="flex gap-2 items-center py-4 justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Avatar src={user?.avatarUrl} />
                  <div>
                    <p className="font-bold">{user?.fullname}</p>
                    <Link to={`/${user?.username}`}>
                      <p className="text-sm text-gray-500 hover:underline">
                        @{user?.username}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {user?.role === 'member' ? (
                    <p className="text-sm">Thành viên</p>
                  ) : (
                    <p className="text-sm">Quản trị</p>
                  )}
                  {user?._id !== currentUser?.data?.data?._id &&
                    data?.data?.room?.admins?.includes(
                      currentUser?.data?.data?._id,
                    ) && (
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-red-500 font-bold text-white text-sm"
                        onClick={() =>
                          removeUserOfRoom({ roomId: page, userId: user?._id })
                        }
                      >
                        Xóa
                      </button>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="font-bold py-4">Ảnh/Video</p>
        <button
          onClick={() => navigate(`/messages/${page}/invite`)}
          className="text-blue-400 text-sm font-bold mx-auto block py-2"
        >
          Mời bạn
        </button>
        <button
          className="text-red-400 text-sm font-bold mx-auto block my-2"
          type="button"
          onClick={() => {
            data?.data?.room?.isRoom ? leaveGroup(page) : deleteRoom(page);
          }}
        >
          {data?.data?.room?.isRoom ? ' Rời nhóm' : 'Xóa hội thoại'}
        </button>
      </div>
    </div>
  );
}
