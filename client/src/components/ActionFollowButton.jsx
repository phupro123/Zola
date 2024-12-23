import React, { useMemo } from 'react';
import { useUser } from '../hooks/auth';
import { useFollowStatus, useFollowUser, useUnfollowUser } from '../hooks/user';

function ActionFollowButton(props) {
  const { data: user } = useUser();
  const { data: status, isLoading } = useFollowStatus(
    props?.username,
    user?.data?.data?.username,
  );
  const { mutate: followUser } = useFollowUser(
    props?.username,
    user?.data?.data?.username,
  );
  const { mutate: unfollowUser } = useUnfollowUser(
    props?.username,
    user?.data?.data?.username,
  );
  return (
    <div className="h-16 w-full flex justify-end gap-2">
      {isLoading ? (
        <button
          type="button"
          className="w-fit h-fit px-4 py-2  rounded-xl bg-gray-50 transition-colors duration-150 hover:bg-gray-100 text-black text-sm font-bold animate-pulse"
        >
          Đang xử lý...
        </button>
      ) : (
        <>
          {status?.data?.metadata?.isFriend ? (
            <button
              className="w-fit h-fit px-4 py-2  rounded-xl bg-gray-50 transition-colors duration-150 hover:bg-gray-100 text-black text-sm font-bold"
              type="button"
              onClick={() =>
                unfollowUser(props?.username, user?.data?.data?.username)
              }
            >
              Đã kết bạn
            </button>
          ) : (
            <>
              {status?.data?.metadata?.isFollowing ? (
                <button
                  className="w-fit h-fit px-4 py-2  rounded-xl bg-gray-50 transition-colors duration-150 hover:bg-gray-100 text-black text-sm font-bold"
                  type="button"
                  onClick={() =>
                    unfollowUser(props?.username, user?.data?.data?.username)
                  }
                >
                  Đã theo dõi
                </button>
              ) : (
                <button
                  className="w-fit h-fit px-4 py-2  rounded-xl bg-blue-500 transition-colors duration-150 hover:bg-blue-600 text-white text-sm font-bold"
                  type="button"
                  onClick={() =>
                    followUser(props?.username, user?.data?.data?.username)
                  }
                >
                  Theo dõi
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ActionFollowButton;
