import React, { useState } from 'react';
import _ from 'lodash';
import { Like1, ArrowDown2, ArrowUp2, More, CloseCircle } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import {
  useCommentByPost,
  useDeleteComment,
  useGetReplyComment,
  useLikeComment,
  useReplyComment,
} from '../../hooks/comment';
import parse from 'html-react-parser';
import { useUser } from '../../hooks/auth';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Avatar } from '../../components/Avatar';
import Dropdown from 'rc-dropdown';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';

function CommentItem(props) {
  const { postId } = useParams();
  const { data: user } = useUser();

  const [liked, setLiked] = useState(props?.isLike);

  const { register, handleSubmit, resetField } = useForm();
  const [reply, setReply] = useState(false);
  const [showReplyComment, setShowReplyComment] = useState(false);
  const { mutate } = useReplyComment(props?._id);
  const { data } = useGetReplyComment(props?._id);

  const { mutate: likeComment } = useLikeComment(postId);

  const toggleReply = () => {
    setReply(state => !state);
  };
  const toggleReplyComment = () => {
    setShowReplyComment(state => !state);
  };

  const { mutate: deleteComment } = useDeleteComment(postId);
  const onSubmit = data => {
    resetField('comment');
    const payload = {
      postId: props?.postId,
      parent_id: props?._id,
      reply_to: user?.data?.data?._id,
      content: data?.comment,
    };
    mutate(payload);
  };
  return (
    <div className="px-4 py-4 flex gap-2 items-center rounded-lg hover:bg-gray-100 relative group transition-colors duration-75">
      {user?.data?.data?.username === props?.author?.username && (
        <Dropdown
          trigger={['click']}
          overlay={
            <ul className="bg-white shadow rounded-lg overflow-hidden">
              <li
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm flex items-center gap-2 text-red-500"
                onClick={() => deleteComment(props?._id)}
              >
                <CloseCircle variant="Bulk" size={18} />
                Xóa bình luận
              </li>
            </ul>
          }
        >
          <button
            type="button"
            className="opacity-0 absolute top-2 right-2 group-hover:opacity-100 transition-opacity duration-75"
          >
            <More size={18} variant="Bulk" />
          </button>
        </Dropdown>
      )}
      <div className="flex items-start gap-2 w-full">
        <div className="w-[10%]">
          <div className="h-10 w-10">
            <Avatar src={props?.author?.avatarUrl} />
          </div>
        </div>
        <div className="grow">
          <div className="flex gap-2">
            <div>
              <strong className="text-sm">{props?.author?.fullname}</strong>
              <Link to={`/${props?.author?.username}`}>
                <p className="text-gray-500 hover:underline">
                  @{props?.author?.username}
                </p>
              </Link>
            </div>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(props?.created_at), {
                locale: vi,
                addSuffix: true,
              })}
            </span>
          </div>
          <p>{parse(props?.content)}</p>
          <div className="flex gap-2 items-center">
            <button
              className="flex items-center gap-2 hover:text-blue-600 text-blue-600"
              type="button"
              onClick={() => {
                setLiked(state => !state);
                likeComment(props?._id);
              }}
            >
              <Like1 size={18} variant={liked ? 'Bold' : 'Outline'} />
              <small>{props.totalLike}</small>
            </button>

            {user?.data?.data?.username !== props?.author?.username && (
              <button
                type="button"
                className="font-bold text-sm p-2 rounded-full hover:bg-gray-100"
                onClick={e => {
                  e.stopPropagation();
                  toggleReply();
                }}
              >
                Phản hồi
              </button>
            )}
          </div>
          {reply && (
            <div className="my-2">
              <p className="font-bold text-blue-500 text-sm">
                @{props?.author?.username}
              </p>
              <form
                onClick={e => e.stopPropagation()}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  id="comment"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 focus:border-transparent focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  placeholder="Nhập bình luận của bạn!"
                  {...register('comment')}
                />
              </form>
            </div>
          )}
          {props?.totalReply > 0 && (
            <>
              <div
                className="flex items-center gap-2 text-blue-500 font-bold"
                onClick={e => {
                  e.stopPropagation();
                  toggleReplyComment();
                }}
              >
                {showReplyComment ? (
                  <ArrowUp2 size={18} />
                ) : (
                  <ArrowDown2 size={18} />
                )}

                <p className="text-sm select-none cursor-pointer">
                  {props?.totalReply} Phản hồi
                </p>
              </div>
              {showReplyComment && (
                <div className="flex flex-col gap-4">
                  {data?.data?.map(comment => {
                    console.log(comment);
                    return (
                      <div className="my-2">
                        <div className="flex gap-2 items-center">
                          <Avatar src={comment?.author?.avatarUrl} />
                          <div>
                            <p className="font-bold">
                              {comment?.author?.fullname}
                              <span className="w-1 h-1 rounded-full bg-gray-600 inline-block mx-2" />
                              <span className="text-sm text-gray-500 font-normal">
                                {formatDistanceToNow(
                                  new Date(comment?.created_at),
                                  {
                                    locale: vi,
                                    addSuffix: true,
                                  },
                                )}
                              </span>
                            </p>
                            <p className="text-sm text-gray-500">
                              @{comment?.author?.username}
                            </p>
                            <p>{comment?.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Comment() {
  const { postId } = useParams();
  const { data, isLoading } = useCommentByPost(postId);
  console.log(data);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="rounded-lg flex flex-col">
          {data?.data?.toReversed().map(comment => {
            return <CommentItem {...comment} key={comment?._id} />;
          })}
        </div>
      )}
    </>
  );
}
