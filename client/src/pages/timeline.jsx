import { useEffect } from 'react';
import PostCard from '../parts/Post/PostCard';
import { APP_NAME } from '~/configs';
import { useInfiniteQuery } from '@tanstack/react-query';
import Post from '~/api/Post';
import Loading from '~/components/Loading';
import { Home2, Menu } from 'iconsax-react';
import Empty from '../components/Empty';
import { useUser } from '../hooks/auth';
import { useInView } from 'react-intersection-observer';
import CardSkeleton from '../components/CardSkeleton';

const Posts = () => {
  const { ref, inView } = useInView();
  const user = useUser();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['getPostTimeline'],
      queryFn: ({ pageParam = 1 }) =>
        Post.getPostTimeline(user?.data?.data?.data?.username, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.length !== 0 ? nextPage : undefined;
      },
    });

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col w-full items-center justify-center">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <>
          {data?.pages[0]?.data?.length === 0 ? (
            <Empty />
          ) : (
            <div className="overflow-x-hidden w-full">
              {data?.pages?.map(page => {
                return page?.data?.map(post => {
                  return <PostCard {...post} key={post?._id} />;
                });
              })}
              <div ref={ref} className="h-2" />
              {isFetchingNextPage && hasNextPage && <Loading />}
            </div>
          )}
        </>
      )}
    </>
  );
};

function Timeline() {
  useEffect(() => {
    document.title = `Trang chủ - ${APP_NAME}`;
  }, []);
  return (
    <>
      <div className="sticky top-0 z-10 backdrop-blur">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <button
              className="hover:text-blue-600"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              type="button"
            >
              <Home2 size={18} variant="Bold" />
            </button>
            <p className="font-bold hover:cursor-pointer select-none">
              Trang chủ
            </p>
          </div>
          <button className="hover:text-blue-600" type="button">
            <Menu size={18} variant="Bold" />
          </button>
        </div>
      </div>
      <Posts />
    </>
  );
}
export default Timeline;
