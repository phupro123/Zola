import { Link } from 'react-router-dom';
import React from 'react';
import { useForm } from 'react-hook-form';
import { APP_NAME } from '../configs';
import { useForgotOtp, useVerifyForgotOtp } from '../hooks/otp';
import { useResetPassword } from '../hooks/auth';

function Forgot() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { mutate: getForgotOtp, isSuccess: successForgotOtp } = useForgotOtp();
  const {
    mutate: verifyForgotOtp,
    isSuccess: successVerifyForgotOtp,
    data: dataVerifyOtp,
  } = useVerifyForgotOtp();

  const { mutate: newPassword } = useResetPassword();

  const onSubmit = data => {
    successForgotOtp
      ? successVerifyForgotOtp
        ? newPassword({
            password: data?.confirm_password,
            accessToken: dataVerifyOtp?.data?.accessToken,
          })
        : verifyForgotOtp({
            email: data?.email,
            otp: data?.otp,
          })
      : getForgotOtp({
          email: data?.email,
        });
  };

  return (
    <div className="h-screen bg-[#F6F6F9] bg-cover bg-no-repeat text-gray-900">
      <div className="mx-auto flex h-screen flex-col items-center justify-center gap-8">
        <form
          className="w-full max-w-[550px] rounded border bg-white px-10 py-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center">
            <svg
              width="56"
              height="56"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.4477 9.62517C8.4477 9.62517 9.74906 7.8694 12.7098 7.30945C15.6706 6.7495 18.4332 7.12051 18.4332 7.12051C18.4332 7.12051 24.6265 8.26958 27.1236 13.1933C29.6207 18.1171 28.2341 22.1269 26.7718 23.6617C25.3095 25.1965 18.2459 29.9662 19.2204 35.4373C20.1948 40.9085 20.6914 41.0579 20.6914 41.0579C20.6914 41.0579 21.8919 42.4082 19.8202 42.839C17.7486 43.2697 16.3335 43.5084 13.3693 41.8131C10.4051 40.1178 10.7355 35.0817 10.7355 35.0817C10.7355 35.0817 10.8348 32.9345 11.7162 31.7342C12.5976 30.5338 16.0712 27.2351 16.2615 24.7982C16.4517 22.3613 16.27 19.6531 15.3861 19.2772C14.5022 18.9014 14.2791 19.536 14.4684 20.0297C14.6577 20.5235 15.9009 25.5703 14.3854 26.364C12.8698 27.1576 7.62256 25.1226 6.82736 23.8469C6.03217 22.5712 5.13749 21.7368 5.03954 19.8056C4.9416 17.8745 4.93857 14.7048 6.09759 12.6939C7.25662 10.683 8.4477 9.62517 8.4477 9.62517Z"
                fill="#34a9e5"
              />
              <path
                d="M32.0897 14.4435C31.3371 14.4505 30.7134 14.7536 30.8806 15.6885C30.8806 15.6885 31.1224 17.4231 30.0296 20.3606C28.9368 23.298 25.8342 26.2663 24.0688 27.8201C22.2721 29.4014 20.9367 31.4829 20.4952 34.0083C20.0591 36.5022 21.2189 40.878 22.7381 42.1348C24.1877 43.334 26.433 43.7977 26.433 43.7977L35.968 43.8299C35.968 43.8299 37.7034 43.7012 37.9917 42.4617C38.28 41.2223 38.273 41.0839 37.6498 40.0695C37.0266 39.0551 34.6824 39.4272 34.6824 39.4272C34.6824 39.4272 34.6886 39.1432 34.6119 38.2955C34.5353 37.4478 33.898 36.8424 33.2993 36.0635C32.7006 35.2846 30.6821 35.1935 30.223 35.2998C29.764 35.406 29.1269 35.5072 28.8983 35.0466C28.6698 34.5859 29.2982 34.2753 29.6818 34.1419C30.0654 34.0085 31.5182 34.0294 32.312 34.202C33.1059 34.3745 33.9463 35.0603 34.4468 35.5241C34.9473 35.9878 35.3949 37.4754 35.7674 37.7008C36.1398 37.9263 36.4454 37.976 37.5258 38.0224C38.6062 38.0688 39.4524 37.904 39.9007 37.6775C40.3491 37.4509 40.8636 36.795 41.0175 35.7335C41.1714 34.672 40.6569 34.2941 40.2464 33.6852C39.836 33.0763 37.8328 32.8221 37.8328 32.8221C37.8328 32.8221 36.4938 32.4382 35.3347 31.5404C34.1755 30.6425 34.1733 30.1874 34.3459 29.9131C34.5185 29.6388 34.8559 29.34 35.2828 29.7726C35.7098 30.2051 36.5343 30.9513 36.9329 30.7834C37.3315 30.6154 37.1011 30.2426 37.1011 30.2426C37.1011 30.2426 36.9733 30.241 37.7486 30.0858C38.5238 29.9307 39.6203 29.547 40.8372 28.9234C42.0542 28.2998 43.3864 26.4534 43.6687 24.6206C43.9511 22.7878 43.2228 21.3049 41.7571 19.375C40.2046 17.3309 36.0215 16.8259 36.0215 16.8259C36.0215 16.8259 34.6802 15.1426 33.4406 14.6783C33.0392 14.5417 32.5413 14.4393 32.0897 14.4435ZM36.8521 20.0384C37.1636 20.0384 37.4623 20.1621 37.6825 20.3823C37.9027 20.6026 38.0264 20.9012 38.0264 21.2127C38.0264 21.5241 37.9027 21.8228 37.6825 22.043C37.4623 22.2632 37.1636 22.3869 36.8521 22.3869C36.5407 22.3869 36.242 22.2632 36.0218 22.043C35.8016 21.8228 35.6779 21.5241 35.6779 21.2127C35.6779 20.9012 35.8016 20.6026 36.0218 20.3823C36.242 20.1621 36.5407 20.0384 36.8521 20.0384Z"
                fill="#34a9e5"
              />
              <path
                d="M43.7543 31.7601L44.571 31.7616C44.571 31.7616 44.9303 31.8534 44.9685 32.102C45.0066 32.3506 45.047 32.9455 44.8487 33.02C44.6505 33.0945 44.5532 33.247 44.5336 33.6485C44.514 34.0499 44.5386 35.201 43.918 35.7385C43.2974 36.276 42.9643 36.6912 42.488 36.6019C42.0116 36.5126 42.2525 35.9346 42.285 35.714C42.3175 35.4934 42.1753 34.5272 42.0126 34.0823C41.8499 33.6373 41.2176 32.866 41.0008 32.7076C40.7841 32.5493 40.458 32.2828 40.5788 31.9877C40.6996 31.6926 41.1564 31.7627 41.1564 31.7627L41.351 31.7526L41.3612 30.9894C41.3612 30.9894 41.3969 30.7996 41.9449 30.655C42.493 30.5105 42.7035 30.9687 42.726 31.2296C42.7485 31.4906 42.7671 31.7299 42.7671 31.7299L43.7543 31.7601Z"
                fill="#34a9e5"
              />
            </svg>
          </div>
          <h1 className="text-center font-bold">Quên mật khẩu</h1>
          <p className="pb-6 text-center text-sm leading-6 text-gray-700">
            Nhập thông tin để tạo mật khẩu mới!
          </p>

          {successForgotOtp && !successVerifyForgotOtp ? (
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-900"
              >
                Mã xác nhận <span className="text-red-500">*</span>
                <input
                  type="text"
                  id="otp"
                  className={`mt-2 block w-full grow rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:outline-blue-600 ${
                    errors.email &&
                    'border-2 border-red-600 focus:outline-red-600'
                  }`}
                  {...register('otp')}
                />
              </label>
              {errors.otp && (
                <p className="text-sm text-red-400">
                  Vui lòng nhập mã xác nhận
                </p>
              )}
            </div>
          ) : (
            <>
              {successVerifyForgotOtp ? (
                <>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Mật khẩu mới <span className="text-red-500">*</span>
                      <input
                        type="password"
                        id="password"
                        className={`mt-2 block w-full grow rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:outline-blue-600 ${
                          errors.email &&
                          'border-2 border-red-600 focus:outline-red-600'
                        }`}
                        {...register('password')}
                      />
                    </label>
                    {errors.password && (
                      <p className="text-sm text-red-400">
                        Vui lòng nhập mật khẩu
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="confirm_password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Xác nhận mật khẩu <span className="text-red-500">*</span>
                      <input
                        type="password"
                        id="password"
                        className={`mt-2 block w-full grow rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:outline-blue-600 ${
                          errors.confirm_password &&
                          'border-2 border-red-600 focus:outline-red-600'
                        }`}
                        {...register('confirm_password')}
                      />
                    </label>
                    {errors.confirm_password && (
                      <p className="text-sm text-red-400">
                        Vui lòng nhập mật khẩu
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email <span className="text-red-500">*</span>
                    <input
                      type="text"
                      id="email"
                      className={`mt-2 block w-full grow rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:outline-blue-600 ${
                        errors.email &&
                        'border-2 border-red-600 focus:outline-red-600'
                      }`}
                      {...register('email')}
                    />
                  </label>
                  {errors.email && (
                    <p className="text-sm text-red-400">Vui lòng nhập email</p>
                  )}
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className="my-8 mr-2 w-full rounded-lg bg-blue-600 px-5 py-4 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-400"
          >
            Gửi
          </button>

          <p className="mt-6">
            <span>Quay về?</span>
            <Link to="/auth/login">
              <strong className="hover:underline"> Đăng nhập</strong>
            </Link>
          </p>
        </form>
        <p className="text-sm font-medium">
          Copyright @{APP_NAME} {new Date().getFullYear()}| Privacy policy
        </p>
      </div>
    </div>
  );
}

export default Forgot;