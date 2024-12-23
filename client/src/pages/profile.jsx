import React, { useMemo } from 'react';
import UserPost from '../parts/Profiles/UserPost';
import UserLikedPost from '../parts/Profiles/UserLikedPost';
import UserGallery from '../parts/Profiles/UserGallery';
import Empty from '../components/Empty';
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom';
import { Location, Calendar, ArrowLeft, ArrowLeft2 } from 'iconsax-react';
import { formatNumber } from '../utils';
import _ from 'lodash';
import ImageBox from '../components/ImageBox';
import { useUser } from '../hooks/auth';
import ActionFollowButton from '../components/ActionFollowButton';
import { format } from 'date-fns';
import Tabs from '../parts/Profiles/Tabs';
import { userInfoUser } from '../hooks/user';

export default function Profile() {
  const { tab, username } = useParams();
  const { data: currentUser } = useUser();
  const { data: info, isLoading } = userInfoUser(username);
  const navigate = useNavigate();

  const renderTab = useMemo(() => {
    switch (tab) {
      case 'likes':
        return info?.data?.data?.username === username ? (
          <UserLikedPost />
        ) : (
          <Empty />
        );
      case 'gallery':
        return info?.data?.data?.username === username ? (
          <UserGallery />
        ) : (
          <Empty />
        );
      case undefined:
        return <UserPost />;
    }
  }, [tab]);

  return (
    <>
      <>
        <div className="sticky top-0 z-10 backdrop-blur">
          <div className="flex items-center py-2.5 px-2 gap-2">
            <button type="button" onClick={() => navigate(-1)}>
              <ArrowLeft2 size={18} variant="Outline" />
            </button>
            <div>
              {isLoading ? (
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </div>
              ) : (
                <p className="font-bold text-xl">
                  {info?.data?.data?.fullname}
                </p>
              )}
              <p className="text-gray-600 text-sm">
                {info?.data?.data?.username && `@${info?.data?.data?.username}`}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="relative">
            <div className="h-56 w-full lg:rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="bg-gray-700 w-full h-full animate-pulse"></div>
              ) : (
                <ImageBox
                  src={info?.data?.data?.coverUrl || '/placeholder.webp'}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="h-32 w-32 rounded-full absolute bottom-0 translate-y-1/2 left-4 overflow-hidden bg-white">
              {isLoading ? (
                <div></div>
              ) : (
                <ImageBox
                  src={info?.data?.data?.avatarUrl || '/placeholder.webp'}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div>
            {!isLoading && (
              <div className="flex justify-end items-center h-1/3 p-4 gap-2">
                {username === currentUser?.data?.data?.username ? (
                  <Link
                    to="/settings/profile"
                    className="border rounded-full group bg-white text-black hover:bg-gray-50 font-semibold cursor-pointer px-3 py-1.5"
                  >
                    Chỉnh sửa
                  </Link>
                ) : (
                  <ActionFollowButton username={username} />
                )}
              </div>
            )}
            <div className="px-4">
              {!isLoading && (
                <>
                  <p className="text-xl font-bold">
                    {info?.data?.data?.fullname}
                  </p>
                  <p className="text-gray-500 text-sm font-medium">
                    @{info?.data?.data?.username}
                  </p>
                </>
              )}

              <p className="leading-relaxed font-base text-justify">
                {info?.data?.data?.contact_info?.bio}
              </p>
              {!isLoading && (
                <div className="flex lg:gap-8 py-4 flex-col lg:flex-row gap-2">
                  {info?.data?.data?.contact_info?.address && (
                    <div className="flex items-center gap-2">
                      <Location size={18} />
                      <span className="text-gray-700">
                        {info?.data?.data?.contact_info?.address}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    {!isLoading && (
                      <p className="text-gray-700">
                        Đã tham gia&nbsp;
                        {info?.data?.data?.created_date &&
                          format(
                            new Date(info?.data?.data?.created_date),
                            'dd/MM/yyyy',
                          )}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {!isLoading && (
                <>
                  <Link
                    to={`/${info?.data?.data?.username}/following`}
                    className="mr-4 hover:text-blue-500 hover:underline"
                    title={formatNumber(info?.data?.metadata?.following)}
                  >
                    <span className="font-bold">
                      {formatNumber(info?.data?.metadata?.following)}
                    </span>
                    <span className="mx-2 text-gray-500">Đang theo dõi</span>
                  </Link>
                  <Link
                    to={`/${info?.data?.data?.username}/follower`}
                    className="mr-4 hover:text-blue-500 hover:underline"
                    title={formatNumber(info?.data?.metadata?.follower)}
                  >
                    <span className="font-bold">
                      {formatNumber(info?.data?.metadata?.follower)}
                    </span>
                    <span className="mx-2 text-gray-500">Người theo dõi</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          {!isLoading && <Tabs />}
        </div>
        {renderTab}
      </>
      {!isLoading && !info?.data?.data?.username && <Navigate to="/404" />}
    </>
  );
}
