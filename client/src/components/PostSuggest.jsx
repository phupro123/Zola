import { Link } from 'react-router-dom';
import { useHotPost } from '../hooks/post';

function PostSuggest() {
  const { data } = useHotPost(5);
  return (
    <div className="w-full">
      <p className="font-bold text-xl p-4">Bài viết nổi bật</p>
      {data?.data?.data?.map(post => {
        return (
          <div className="hover:bg-gray-100 p-4" key={post?._id}>
            <div className="flex justify-between items-center">
              <div className="grow">
                {post.hashtag?.map(tag => {
                  return (
                    <small className="text-gray-500">{tag && `#${tag}`}</small>
                  );
                })}
              </div>
            </div>
            <Link to={`/${post.author?.username}`}>
              <p className="text-gray-600 hover:underline">
                {post.author?.fullname}
              </p>
            </Link>
            <Link to={`/${post.author?.username}/post/${post._id}`}>
              <p className="font-bold line-clamp-1 hover:text-blue-400">
                {post.content}
              </p>
            </Link>
            <p className="text-gray-500 text-sm">{post.totalLike} lượt thích</p>
          </div>
        );
      })}
      <Link className="block text-blue-500 py-4 px-4 hover:bg-gray-100 w-full">
        Xem thêm
      </Link>
    </div>
  );
}
export default PostSuggest;
