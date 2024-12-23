import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft2,
  Clipboard,
  Heart,
  MessageText1,
  More,
  Send,
} from 'iconsax-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loading from '~/components/Loading';
import Post from '~/api/Post';
import { Link } from 'react-router-dom';
import { formatNumber } from '~/utils';
import parse from 'html-react-parser';
import Comment from '../parts/Post/Comment';
import { useCommentByPost } from '../hooks/comment';
import Files from '../components/Files';
import { Avatar } from '../components/Avatar';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { useCommentPost, useLikePost } from '../hooks/post';
import { toast } from 'react-hot-toast';
import CopyToClipboard from 'react-copy-to-clipboard';
import { vi } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';

function PostDetailPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, resetField } = useForm();
  const { postId } = useParams();

  const { mutate } = useCommentPost(postId);
  const { mutate: like } = useLikePost(postId);

  const { data: post, isLoading: loadingPost } = useQuery({
    queryKey: ['getPost', postId],
    queryFn: () => Post.getPostById(postId),
  });

  const [isLike, setIsLike] = useState(null);
  const handleLike = () => {
    setIsLike(state => !state);
    like(postId);
  };

  const onSubmit = data => {
    const payload = {
      content: data?.comment,
      postId,
    };
    mutate(payload);
    resetField('comment');
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLike(post?.data?.isLike);
  }, [post]);

  useEffect(() => {
    if (post) {
      document.title = `${post?.data?.author?.fullname} đăng trên Zola: ${post?.data?.content}`;
    }
  }, [post]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="sticky top-0 z-10 backdrop-blur">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <button className="" onClick={() => navigate(-1)} type="button">
              <ArrowLeft2 size={18} variant="Outline" />
            </button>
            <p
              className="font-bold hover:cursor-pointer select-none"
              onClick={handleClick}
            >
              Bài viết
            </p>
          </div>
        </div>
      </div>
      {loadingPost ? (
        <Loading />
      ) : (
        <div className="p-4">
          <div>
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex gap-2">
                <Avatar src={post?.data?.author?.avatarUrl} />
                <div>
                  <strong>{post?.data?.author?.fullname}</strong>
                  <Link to={`/${post?.data?.author?.username}`}>
                    <p className="text-gray-500 text-sm hover:underline">
                      @{post?.data?.author?.username}
                    </p>
                  </Link>
                </div>
              </div>
              <button className="rounded-full p-2 hover:bg-gray-50">
                <More size={18} />
              </button>
            </div>
            <Files attach_files={post?.data?.attach_files} />
            <p className=" text-lg text-gray-800 leading-10 text-justify my-4">
              {parse(post?.data?.content || '')}
            </p>

            <p className="text-sm py-2 text-gray-600 font-medium">
              {post?.data?.created_at &&
                formatDistanceToNow(new Date(post?.data?.created_at), {
                  locale: vi,
                  addSuffix: true,
                })}
            </p>
            <div className="flex py-4 gap-2">
              <div className="flex items-center gap-2">
                <button
                  className={`rounded-full p-1 transition-all duration-300 delay-75 hover:text-red-600 ${
                    isLike && 'text-red-600'
                  }`}
                  type="button"
                  onClick={handleLike}
                >
                  <Heart size={18} variant={isLike ? 'Bold' : 'Outline'} />
                </button>
                <p className="hover:underline hover:cursor-pointer text-sm text-gray-600">
                  {formatNumber(post?.data?.totalLike)} Thích
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label
                  className="hover:text-blue-600 rounded-full p-1 transition-all duration-300 delay-75 cursor-pointer"
                  htmlFor="comment"
                >
                  <MessageText1 size="18" />
                </label>
                <p className="hover:underline hover:cursor-pointer text-sm text-gray-600">
                  {formatNumber(post?.data?.totalComment)} Bình luận
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CopyToClipboard
                  text={`${window.location.origin}/${post?.data?.author?.username}/post/${postId}`}
                  onCopy={() => {
                    toast.success('Đã sao chép địa chỉ bài viết thành công!');
                  }}
                >
                  <button className="hover:text-green-600 rounded-full p-1 transition-all duration-300 delay-75">
                    <Clipboard size={18} />
                  </button>
                </CopyToClipboard>
                <p className="hover:underline hover:cursor-pointer text-sm text-gray-600">
                  {formatNumber(post?.data?.shared)} Chia sẻ
                </p>
              </div>
            </div>
          </div>
          <form className="my-2 relative" onSubmit={handleSubmit(onSubmit)}>
            <button
              type="submit"
              className="bg-blue-600 absolute bottom-2 right-2 rounded-lg px-4 py-2 font-bold text-sm text-white"
            >
              Bình luận
            </button>
            <TextareaAutosize
              id="comment"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 focus:border-transparent focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none resize-none"
              placeholder="Bình luận..."
              {...register('comment', { required: true })}
              minRows={4}
            />
          </form>
          <Comment />
        </div>
      )}
    </>
  );
}
export default PostDetailPage;
