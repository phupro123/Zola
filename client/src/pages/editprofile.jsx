import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { ArrowLeft2, Send, GalleryAdd } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect } from 'react';
import ImageBox from '../components/ImageBox';
import { useUser } from '../hooks/auth';
import { useChangeAvatar, useChangeCover, useUpdateInfo } from '../hooks/user';

export default function EditProfile() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { register, handleSubmit, setValue, watch } = useForm();
  const { mutate: updateInfo } = useUpdateInfo();
  const { mutate: changeAvatar } = useChangeAvatar();
  const { mutate: changeCover } = useChangeCover();
  const onSubmit = data => {
    if (data?.cover?.length === 1) {
      changeCover(Array.from(data?.cover)[0]);
    }
    if (data?.avatar?.length === 1) {
      changeAvatar(Array.from(data?.avatar)[0]);
    }
    if (
      data?.fullname !== user?.data?.data?.fullname ||
      data?.bio !== user?.data?.data?.contact_info?.bio ||
      data?.address !== user?.data?.data?.contact_info?.address
    ) {
      const payload = {
        fullname: data?.fullname,
        bio: data?.bio,
        address: data?.address,
      };
      updateInfo(payload);
    }
  };
  useEffect(() => {
    setValue('fullname', user?.data?.data?.fullname);
    setValue('bio', user?.data?.data?.contact_info?.bio);
    setValue('address', user?.data?.data?.contact_info?.address);
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <div className="flex items-center justify-between py-4 px-2 lg:px-0 sticky top-0 z-30 bg-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/${user?.data?.data?.username}`)}
            >
              <ArrowLeft2 size={18} />
            </button>

            <p className="font-bold">Chỉnh sửa hồ sơ</p>
          </div>
          <button
            type="submit"
            className="font-bold text-sm text-white disabled:text-gray-700 rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-150"
          >
            Cập nhật
          </button>
        </div>

        <div>
          <div className="relative">
            <div className="h-56 bg-green-100 bg-cover bg-no-repeat bg-center relative">
              <label
                className="absolute inset-0 bg-black/30 flex justify-center items-center hover:cursor-pointer"
                htmlFor="cover"
              >
                <GalleryAdd size={18} variant="Bold" />
              </label>
              <input
                type="file"
                name="cover"
                id="cover"
                accept="image/*"
                {...register('cover')}
                className="hidden"
              />
              <ImageBox
                src={
                  watch('cover')?.length === 1
                    ? URL.createObjectURL(Array.from(watch('cover'))[0])
                    : user?.data?.data?.coverUrl
                }
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-32 w-32 rounded-full border-4 border-white absolute bottom-0 translate-y-1/2 left-4 overflow-hidden bg-white bg-cover bg-no-repeat bg-center">
              <label
                className="absolute inset-0 bg-black/30 flex justify-center items-center hover:cursor-pointer"
                htmlFor="avatar"
              >
                <GalleryAdd size={18} variant="Bold" />
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                {...register('avatar')}
                className="hidden"
              />
              <ImageBox
                src={
                  watch('avatar')?.length === 1
                    ? URL.createObjectURL(Array.from(watch('avatar'))[0])
                    : user?.data?.data?.avatarUrl
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="h-24"></div>
          <div className="px-2 lg:px-0">
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Họ và tên
            </label>
            <input
              type="text"
              id="fullname"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder=""
              {...register('fullname')}
            />
            <label
              htmlFor="bio"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mô tả
            </label>
            <TextareaAutosize
              id="bio"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none resize-none"
              placeholder="Mô tả..."
              minRows={8}
              {...register('bio')}
            />
            <label
              htmlFor="address"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Địa chỉ
            </label>
            <TextareaAutosize
              id="address"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none resize-none"
              placeholder="Địa chỉ..."
              minRows={4}
              {...register('address')}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
