import { useParams } from 'react-router-dom';
import PostCard from '../Post/PostCard';
import Loading from '~/components/Loading';
import Empty from '../../components/Empty';
import Post from '../../api/Post';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function UserLikedPost() {
  const { username } = useParams();

  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['getPostUserLiked', username],
      queryFn: ({ pageParam = 1 }) =>
        Post.getPostUserLiked({ username, offset: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.length !== 0 ? nextPage : undefined;
      },
    });

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.pages[0]?.data?.data?.length === 0 ? (
            <Empty />
          ) : (
            <div className="w-full overflow-x-hidden">
              {data?.pages?.map(page => {
                return page?.data?.data?.map(post => {
                  return <PostCard {...post} key={post?._id} />;
                });
              })}
              <div ref={ref} className="h-2" />
              {isFetchingNextPage && hasNextPage && <Loading />}
            </div>
          )}
        </>
      )}
    </div>
  );
}
