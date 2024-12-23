import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useChangePassword, useUser } from '../hooks/auth';
import { useChangeUserName, useDeleteAccount } from '../hooks/user';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Portal } from 'react-portal';

function DeleteAccountConfirm(props) {
  const { mutate } = useDeleteAccount();
  return (
    <>
      {props?.open && (
        <Portal>
          <div className="fixed inset-0 flex justify-center items-center bg-black/20">
            <div className="p-4 bg-white rounded-lg w-56">
              <p className="font-bold text-lg text-center">
                Bạn có chắc xóa tài khoản?
              </p>
              <p className="text-sm text-gray-500 text-justify mb-4">
                Tài khoản của bạn sẽ bị xóa vĩnh viễn và mọi dữ liệu sẽ mất hết
              </p>
              <div className="flex gap-4 w-full items-center justify-center">
                <button
                  type="button"
                  className="px-4 py-2 font-bold rounded-lg hover:bg-gray-50"
                  onClick={props?.onCancel}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-400 rounded-lg font-bold text-white hover:bg-red-500 duration-150 transition-colors"
                  onClick={mutate}
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
function AppButton(props) {
  const { children } = props;
  return (
    <button
      className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-400"
      {...props}
    >
      {children}
    </button>
  );
}
function UserForm() {
  const { data } = useUser();
  console.log(data);
  const defaultValues = {
    fullname: data?.data?.data?.fullname,
    username: data?.data?.data?.username,
    email: data?.data?.data?.email,
  };

  const { mutate } = useChangeUserName();
  const { register, handleSubmit, watch } = useForm({
    defaultValues,
  });
  const onSubmit = data => {
    const payload = {
      username: data?.username,
    };
    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full justify-center gap-16 px-12 py-16 flex-col lg:flex-row">
        <div className="max-w-sm w-full">
          <p className="py-3 font-bold dark:text-white">Thông tin tài khoản</p>
          <p className="">Cập nhật thông tin tài khoản của bạn.</p>
        </div>
        <div className="max-w-xl grow">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <img
              alt="avatar"
              src={data?.data?.data?.avatarUrl}
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
            />
          </div>
          <div className="my-6 grow">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Họ và tên
            </label>
            <input
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-transparent focus:outline-2 disabled:bg-gray-100 focus:outline-blue-600 dark:bg-gray-800 dark:text-white bg-gray-50"
              id="fullname"
              type="text"
              disabled
              {...register('fullname')}
            />
          </div>
          <div className="my-6 grow">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Tên người dùng
            </label>
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 left-2 select-none">
                @
              </span>
              <input
                className="mt-2 block w-full rounded-lg border pl-6 border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-transparent focus:outline-2 focus:outline-blue-600 dark:bg-gray-800 dark:text-white bg-gray-50"
                id="username"
                type="text"
                {...register('username', { required: true })}
              />
            </div>
          </div>
          <div className="my-6 grow">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-transparent disabled:bg-gray-100 focus:outline-2 focus:outline-blue-600 dark:bg-gray-800 dark:text-white bg-gray-50"
              id="email"
              disabled
              type="text"
              {...register('email')}
            />
          </div>
          <AppButton
            type="submit"
            disabled={watch('username') === data?.data?.data?.username}
          >
            Thay đổi
          </AppButton>
        </div>
      </div>
    </form>
  );
}

const schema = yup.object().shape({
  new_password: yup.string().required(),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref('new_password')]),
});

function AuthForm() {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate, isSuccess } = useChangePassword();
  const onSubmit = data => {
    const payload = {
      oldPassword: data?.current_password,
      password: data?.confirm_password,
    };
    mutate(payload);
  };
  useEffect(() => {
    isSuccess && reset();
  }, [isSuccess]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full justify-center gap-16 px-12 py-16 flex-col lg:flex-row">
        <div className="max-w-sm">
          <p className="py-3 font-bold dark:text-white">Thay đổi mật khẩu</p>
          <p className="">
            Cập nhật mật khẩu được liên kết với tài khoản của bạn.
          </p>
        </div>
        <div className="max-w-xl grow">
          <div className="my-8 grow">
            <label
              htmlFor="current_password"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Mật khẩu hiện tại
            </label>
            <input
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-transparent focus:outline-2 focus:outline-blue-600 dark:bg-gray-800 dark:text-white bg-gray-50"
              id="current_password"
              type="password"
              {...register('current_password', { required: true })}
            />
          </div>
          <div className="my-8 grow">
            <label
              htmlFor="new_password"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Mật khẩu mới
            </label>
            <input
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-transparent focus:outline-2 focus:outline-blue-600 dark:bg-gray-800 dark:text-white bg-gray-50"
              id="new_password"
              type="password"
              {...register('new_password', { required: true })}
            />
          </div>
          <div className="my-8 grow">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Xác nhận mật khẩu
            </label>
            <input
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-transparent focus:outline-2 focus:outline-blue-600 dark:bg-gray-800 dark:text-white bg-gray-50"
              id="confirm_password"
              type="password"
              {...register('confirm_password')}
            />
          </div>
          <AppButton type="submit">Thay đổi</AppButton>
        </div>
      </div>
    </form>
  );
}

function SessionForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full justify-center gap-16 px-12 py-16 flex-col lg:flex-row">
        <div className="max-w-sm">
          <p className="py-3 font-bold dark:text-white">
            Đăng xuất các phiên khác
          </p>
          <p className="">
            Vui lòng nhập mật khẩu của bạn để xác nhận rằng bạn muốn đăng xuất
            khỏi các phiên khác trên tất cả các thiết bị của mình.
          </p>
        </div>
        <div className="max-w-xl grow">
          <div className="my-8 grow">
            <label
              htmlFor="current_password"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Mật khẩu của bạn
            </label>
            <input
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-transparent focus:outline-2 focus:outline-blue-600 dark:bg-gray-800 dark:text-white bg-gray-50"
              id="current_password"
              type="password"
              {...register('current_password', { required: true })}
            />
          </div>
          <AppButton type="submit">Đăng xuất các phiên khác</AppButton>
        </div>
      </div>
    </form>
  );
}
function AccountForm() {
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="flex w-full justify-center gap-16 px-12 py-16 flex-col lg:flex-row">
      <div className="max-w-sm">
        <p className="py-3 font-bold dark:text-white">Xóa tài khoản</p>
        <p className="">
          Không còn muốn sử dụng dịch vụ của chúng tôi? Bạn có thể xóa tài khoản
          của mình tại đây. Hành động này là không thể đảo ngược. Tất cả thông
          tin liên quan đến tài khoản này sẽ bị xóa vĩnh viễn.
        </p>
      </div>
      <div className="max-w-xl grow">
        <AppButton
          type="button"
          style={{ backgroundColor: 'rgb(239, 68, 68)' }}
          onClick={() => setConfirm(true)}
        >
          Có, xóa tài khoản của tôi
        </AppButton>
        <DeleteAccountConfirm
          open={confirm}
          onCancel={() => setConfirm(false)}
        />
      </div>
    </div>
  );
}
function SettingPage() {
  const { data } = useUser();
  useEffect(() => {
    document.title = `Cài đặt - ${data?.data?.data?.fullname}(@${data?.data?.data?.username})`;
  }, []);
  return (
    <div className="grow">
      <div className="dark:bg-gray-900 grow max-w-5xl mx-auto">
        <UserForm />
        <AuthForm />
        <SessionForm />
        <AccountForm />
      </div>
    </div>
  );
}
export default SettingPage;
