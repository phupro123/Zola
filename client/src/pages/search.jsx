import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'iconsax-react';
import { APP_NAME } from '../configs';
import { useSearchPost } from '../hooks/post';
import { useForm } from 'react-hook-form';
import CardSkeleton from '../components/CardSkeleton';
import ImageBox from '../components/ImageBox';
import { VideoPlayer } from '../components/VideoPlayer';
import { Avatar } from '../components/Avatar';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import parse from 'html-react-parser';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValues = {
    search: searchParams.get('q'),
  };
  const { register, handleSubmit, watch } = useForm({ defaultValues });
  const { mutate, data, isLoading } = useSearchPost();

  const onSubmit = data => {
    const params = {
      search: data?.search,
    };
    setSearchParams({ q: data?.search });
    mutate(params);
  };

  useEffect(() => {
    searchParams.get('q') && mutate({ search: searchParams.get('q') });
  }, [searchParams.get('q')]);

  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  useEffect(() => {
    document.title = `Tìm kiếm ${watch('search')}`;
    setSearchParams({ q: watch('search') });
  }, [watch('search')]);

  useEffect(() => {
    document.title = `${APP_NAME} | Tìm kiếm ${watch('search')}`;
  }, []);

  return (
    <div className="grow">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex w-full items-center py-4 gap-2 max-w-2xl mx-auto px-2 lg:px-0">
          <button className="" type="button" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </button>
          <p className="font-bold">Tìm kiếm</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-4 px-2 lg:px-0">
          <div className="relative max-w-2xl mx-auto">
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
              placeholder="Tìm kiếm..."
              autoFocus
              {...register('search')}
            />
          </div>
        </form>
      </div>
      <div className="lg:px-16 px-2 py-4 grid lg:grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-2">
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
            {data?.data?.data?.map(post => {
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
                      <Link to={`/${post?.author?.username}/post/${post?._id}`}>
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
  );
}
