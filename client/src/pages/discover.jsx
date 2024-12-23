import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '~/components/Loading';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft2, SearchNormal } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { APP_NAME } from '../configs';
import parse from 'html-react-parser';
import { VideoPlayer } from '../components/VideoPlayer';
import ImageBox from '../components/ImageBox';
import { Avatar } from '../components/Avatar';
import Post from '../api/Post';
import { usePostRecommend } from '../hooks/post';
import CardSkeleton from '../components/CardSkeleton';
import { useHashtagTrending } from '../hooks/hashtag';

export default function DiscoverPage() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = ` ${APP_NAME} | Khám phá`;
  }, []);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['hotPost'],
      queryFn: ({ pageParam = 1 }) => Post.hotPost(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage?.data?.data.length !== 0 ? nextPage : undefined;
      },
    });

  const { data: hashtagsTrending } = useHashtagTrending();
  const { data: recommendPost, loadingRecommend } = usePostRecommend();
  const { ref, inView } = useInView();

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView, data]);

  return (
    <div className="grow">
      {/* page header start */}
      <div className="sticky top-0 z-30 bg-white border-b">
        {/* <div className="flex items-center py-4 justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <button className="" onClick={() => navigate(-1)} type="button">
              <ArrowLeft2 size={18} variant="Outline" />
            </button>
            <p className="font-bold hover:cursor-pointer select-none">
              Khám phá
            </p>
          </div>
        </div> */}
        <div className="relative max-w-2xl mx-auto p-2 lg:p-0">
          <div className="absolute inset-y-0 left-2.5 flex items-center pl-3 pointer-events-none">
            <SearchNormal size={18} />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            placeholder="Tìm kiếm..."
            onFocus={() => navigate('/search')}
          />
        </div>

        <div className="w-screen lg:max-w-[85vw] overflow-x-auto scrollbar-hide">
          <div className="p-4 flex gap-4 items-center">
            {hashtagsTrending?.data?.data?.map(tag => {
              return (
                <Link
                  className="px-4 py-1.5 bg-gray-100 w-fit rounded-lg hover:bg-gray-200 transition-colors duration-150 text-sm"
                  to={`/search?q=${tag?.hashtag?.split('#')[1]}`}
                >
                  {tag?.hashtag}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* page header end */}

      <div className="">
        <p className="p-4 font-bold text-lg">Bài viết gợi ý</p>
        <div className="px-2 lg:px-16 grid lg:grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-2">
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              {recommendPost?.data?.data?.map(post => {
                return (
                  <div className="rounded-lg" key={post?._id}>
                    <div className="w-full h-56 rounded-lg overflow-hidden">
                      {post?.attach_files?.length === 0 && (
                        <ImageBox
                          src="/placeholder.webp"
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      )}

                      {post?.attach_files[0]?.resource_type === 'image' && (
                        <ImageBox
                          src={post?.attach_files[0]?.url}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      )}
                      {post?.attach_files[0]?.resource_type === 'video' && (
                        <div className="h-full w-full">
                          <VideoPlayer url={post?.attach_files[0]?.url} />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 py-4">
                      <Avatar src={post?.author?.avatarUrl} alt="" />
                      <div>
                        <Link
                          to={`/${post?.author?.username}/post/${post?._id}`}
                        >
                          <p className="font-bold line-clamp-2 break-all">
                            {parse(post?.content)}
                          </p>
                        </Link>

                        <Link to={`/${post?.author?.username}`}>
                          <p className="text-gray-400 hover:underline">
                            @{post?.author?.username}
                          </p>
                        </Link>

                        <div className="text-sm text-gray-400 flex items-center">
                          {post?.totalLike} lượt thích
                          <span className="h-1 w-1 rounded-full bg-gray-600 inline-block mx-2" />
                          {formatDistanceToNow(new Date(post?.created_at), {
                            locale: vi,
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      {/* start list start*/}

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <p className="p-4 font-bold text-lg">Tất cả bài viết</p>
          <div className="px-2 lg:px-16 grid lg:grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-2">
            {data?.pages?.map(page => {
              return page?.data?.data?.map(post => {
                return (
                  <div className="rounded-lg" key={post?._id}>
                    <div className="w-full h-56 rounded-lg overflow-hidden">
                      {post?.attach_files?.length === 0 && (
                        <ImageBox
                          src="/placeholder.webp"
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      )}

                      {post?.attach_files[0]?.resource_type === 'image' && (
                        <ImageBox
                          src={post?.attach_files[0]?.url}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      )}
                      {post?.attach_files[0]?.resource_type === 'video' && (
                        <div className="h-full w-full">
                          <VideoPlayer url={post?.attach_files[0]?.url} />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 py-4">
                      <Avatar src={post?.author?.avatarUrl} alt="" />
                      <div>
                        <Link
                          to={`/${post?.author?.username}/post/${post?._id}`}
                        >
                          <p className="font-bold line-clamp-2 break-all">
                            {parse(post?.content)}
                          </p>
                        </Link>

                        <Link to={`/${post?.author?.username}`}>
                          <p className="text-gray-400 hover:underline">
                            @{post?.author?.username}
                          </p>
                        </Link>

                        <div className="text-sm text-gray-400 flex items-center">
                          {post?.totalLike} lượt thích
                          <span className="h-1 w-1 rounded-full bg-gray-600 inline-block mx-2" />
                          {formatDistanceToNow(new Date(post?.created_at), {
                            locale: vi,
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      )}
      {/* start list end*/}
      {/* loading start*/}
      <div ref={ref} className="h-4" />
      {isFetchingNextPage && hasNextPage && <Loading />}
      {/* loading end */}
    </div>
  );
}
