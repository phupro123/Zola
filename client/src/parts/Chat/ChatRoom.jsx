import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AddCircle,
  ArrowLeft,
  Call,
  CloseCircle,
  DocumentUpload,
  EmojiNormal,
  More,
  More2,
  Video,
} from 'iconsax-react';
import {
  useCreateMessage,
  useDeleteMessage,
  useGroupInfo,
  useMessageInRoom,
  useSendFileMessage,
} from '../../hooks/chat';
import TextareaAutosize from 'react-textarea-autosize';
import { useFieldArray, useForm } from 'react-hook-form';
import Loading from '../../components/Loading';
import { useContext, useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';
import Dropdown from 'rc-dropdown';
import Empty from '../../components/Empty';
import { formatDistanceToNow } from 'date-fns';
import { da, vi } from 'date-fns/locale';
import ImageBox from '../../components/ImageBox';
import ReactPlayer from 'react-player';
import { APP_NAME } from '../../configs';
import { VideoPlayer } from '../../components/VideoPlayer';
import { SocketContext } from '../../context/socket';
import { useUser } from '../../hooks/auth';
import { nanoid } from 'nanoid';
import EmojiPicker from '@emoji-mart/react';

const ImageViewer = props => {
  return (
    <div className="max-w-md max-h-96 rounded-lg overflow-hidden hover:bg-gray-50 cursor-pointer">
      <ImageBox
        src={props?.url}
        className="object-contain h-96 max-h-fit w-full"
      />
    </div>
  );
};

export default function ChatRoom() {
  const { page } = useParams();
  const navigate = useNavigate();
  const { data } = useGroupInfo(page);
  const { data: user } = useUser();
  const socket = useContext(SocketContext);

  // const { mutate: sendMessage } = useCreateMessage(page);
  const { mutate, isLoading: isUploadFile } = useSendFileMessage(page);
  const { data: messages, isLoading } = useMessageInRoom(page);
  const { mutate: deleteMessage } = useDeleteMessage();
  const defaultValues = {
    content: '',
    file: '',
  };
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    reset,
    setValue,
    getValues,
    setFocus,
  } = useForm({
    defaultValues,
  });
  const onSubmit = data => {
    // const payload = {
    //   roomId: page,
    //   userId: user?.data?.data?._id,
    //   type: 'text',
    //   message: data?.content,
    // };

    const socketData = {
      _id: nanoid(),
      roomId: page,
      nanoid: nanoid(),
      sender: user?.data?.data,
      content: data?.content,
      message: data?.content,
      userId: user?.data?.data?._id,
      reply_to: null,
      seen_by: [],
      type: 'text',
      attach_files: [],
      deleted_at: null,
      reaction: [],
      created_at: Date.now(),
    };

    // sendMessage(payload);
    socket.emit('send_message', socketData);
  };
  const uploadFile = () => {
    const payload = {
      roomId: page,
      type:
        watch('file')?.length > 0 &&
        Array.from(watch('file'))[0]?.type?.split('/')[0],
      attach_files: watch('file')?.length > 0 && Array.from(watch('file')),
    };

    socket.emit('send_message', {
      roomId: page,
      nanoid: nanoid(),
      sender: user?.data?.data,
      content: '',
      message: '',
      userId: user?.data?.data?._id,
      reply_to: null,
      seen_by: [],
      type:
        watch('file')?.length > 0 &&
        Array.from(watch('file'))[0]?.type?.split('/')[0],
      attach_files: watch('file')?.length > 0 && Array.from(watch('file')),
      deleted_at: null,
      reaction: [],
      created_at: Date.now(),
    });

    mutate(payload);
  };
  const submitButton = useRef();
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    page && reset();
    isUploadFile && reset();
  }, [page, isUploadFile]);
  useEffect(() => {
    document.title = `#${data?.data?.room?.name} | Nhắn tin ${APP_NAME}`;
  }, [data]);

  useEffect(() => {
    socket.on('typing', data => {
      data?.userId !== user?.data?.data?._id && setTyping(true);
    });
    socket.on('stop_typing', data => {
      data?.userId !== user?.data?.data?._id && setTyping(false);
    });
  }, [socket, typing, user]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-between w-full min-h-screen max-h-screen h-screen">
          {/* room chat header start*/}
          <div className="flex justify-between w-full p-4 shadow-lg border-b">
            <div className="flex gap-2 items-center">
              <button type="button" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} />
              </button>
              <Link to={`/messages/${page}/info`}>
                <p className="text-lg font-bold text-gray-800 hover:underline">
                  {data?.data?.room?.name
                    ? `# ${data?.data?.room?.name}`
                    : 'Tên người dùng'}
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button type="button">
                <Call size={18} />
              </button>
              <button type="button">
                <Video size={18} />
              </button>
              <Link to={`/messages/${page}/info`}>
                <button type="button">
                  <More size={18} />
                </button>
              </Link>
            </div>
          </div>
          {/* room chat header end*/}

          {/* room chat list message start*/}
          <div className="flex flex-col-reverse w-full grow h-full overflow-scroll scrollbar-hide bg-gradient-to-r from-blue-50 to-blue-100">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="p-4">
                {messages?.data?.messages?.length === 0 ? (
                  <Empty />
                ) : (
                  <>
                    {messages?.data?.messages?.toReversed()?.map(message => (
                      <>
                        {message?.messageType === 'sender' ? (
                          <div className="flex justify-end py-2">
                            <div>
                              <div className="flex gap-2 items-center justify-end">
                                <span className="text-sm text-gray-500">
                                  Bạn
                                </span>
                                <img
                                  className="w-4 h-4 rounded-full object-cover overflow-hidden"
                                  src={message?.sender?.avatarUrl}
                                />
                              </div>
                              <div className="flex items-center gap-2 group justify-end">
                                <Dropdown
                                  trigger={['click']}
                                  overlay={
                                    <div className="rounded-lg bg-white shadow overflow-hidden">
                                      <ul>
                                        <li
                                          className="text-red-500 p-2 hover:bg-gray-50 cursor-pointer text-sm"
                                          onClick={() => {
                                            socket.emit('delete_message', {
                                              roomId: page,
                                              nanoid: message?.nanoid,
                                            });
                                            deleteMessage({
                                              nanoid: message?.nanoid,
                                              id: message?._id,
                                            });
                                          }}
                                        >
                                          Thu hồi
                                        </li>
                                      </ul>
                                    </div>
                                  }
                                >
                                  <button
                                    type="button"
                                    className="opacity-0 group-hover:opacity-100"
                                  >
                                    <More size={16} />
                                  </button>
                                </Dropdown>
                                {message?.content && (
                                  <p
                                    className={`px-4 py-2 rounded-tl-full rounded-bl-full rounded-br-full text-justify w-fit ${
                                      message?.deleted_at
                                        ? 'bg-gray-500 text-white'
                                        : 'bg-blue-200'
                                    }`}
                                  >
                                    {message?.deleted_at
                                      ? 'Tin nhắn đã bị thu hồi'
                                      : parse(message?.content)}
                                  </p>
                                )}
                                {message?.attach_files?.map(file => {
                                  if (file?.resource_type === 'image') {
                                    return (
                                      <ImageViewer
                                        url={
                                          message?.deleted_at
                                            ? '/placeholder.webp'
                                            : file?.url
                                        }
                                      />
                                    );
                                  }
                                  if (file?.resource_type === 'video') {
                                    return (
                                      <div className="max-w-lg">
                                        <VideoPlayer
                                          url={
                                            message?.deleted_at
                                              ? '/placeholder.webp'
                                              : file?.url
                                          }
                                        />
                                      </div>
                                    );
                                  }
                                })}
                              </div>

                              <p className="text-sm text-gray-500 ml-auto w-fit">
                                {formatDistanceToNow(
                                  new Date(message?.created_at),
                                  {
                                    locale: vi,
                                    addSuffix: true,
                                  },
                                )}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-start py-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <img
                                  className="w-4 h-4 rounded-full object-cover overflow-hidden"
                                  src={message?.sender?.avatarUrl}
                                />
                                <Link to={`/${message?.sender?.username}`}>
                                  <span className="text-sm text-gray-500 hover:underline">
                                    @{message?.sender?.username}
                                  </span>
                                </Link>
                              </div>
                              <div className="flex items-center gap-2 group">
                                {message?.content && (
                                  <p
                                    className={`px-4 py-2 rounded-lg text-justify bg-gray-200 w-fit rounded-bl-full rounded-br-full rounded-tr-full ${
                                      message?.deleted_at
                                        ? 'bg-gray-500 text-white'
                                        : 'bg-gray-200'
                                    }`}
                                  >
                                    {message?.deleted_at
                                      ? 'Tin nhắn đã bị thu hồi'
                                      : parse(message?.content)}
                                  </p>
                                )}
                                {message?.attach_files?.map(file => {
                                  if (file?.resource_type === 'image') {
                                    return <ImageViewer url={file?.url} />;
                                  }
                                  if (file?.resource_type === 'video') {
                                    return <VideoPlayer url={file?.url} />;
                                  }
                                })}
                                <button
                                  type="button"
                                  className="opacity-0 group-hover:opacity-100"
                                >
                                  <More size={16} />
                                </button>
                              </div>

                              <span className="text-sm text-gray-500">
                                {formatDistanceToNow(
                                  new Date(message?.created_at),
                                  {
                                    locale: vi,
                                    addSuffix: true,
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                    {typing && (
                      <div className="flex w-fit px-4">
                        <Loading />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          {/* room chat list message end*/}

          {/* room form start */}
          <div className="p-4 shadow-lg border-t">
            {watch('file')?.length > 0 && (
              <div className="flex">
                <div className="rounded-lg p-4 bg-gray-50 relative overflow-hidden">
                  {isUploadFile && (
                    <div className="absolute inset-0 bg-black/20">
                      <Loading />
                    </div>
                  )}
                  <button
                    type="button"
                    className="absolute top-2 right-2 hover:text-red-300"
                    onClick={() => resetField('file', '')}
                  >
                    <CloseCircle variant="Bulk" />
                  </button>
                  <div className="w-56 h-56 rounded-lg overflow-hidden">
                    {Array.from(watch('file'))[0]?.type?.split('/')[0] ===
                      'image' && (
                      <ImageBox
                        src={URL.createObjectURL(Array.from(watch('file'))[0])}
                        className=" object-contain w-full h-full"
                      />
                    )}
                    {Array.from(watch('file'))[0]?.type?.split('/')[0] ===
                      'video' && (
                      <ReactPlayer
                        playing
                        url={URL.createObjectURL(Array.from(watch('file'))[0])}
                        height="100%"
                        width="100%"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  {watch('file')?.length > 0 && (
                    <p className="text-gray-500 text-sm line-clamp-1 break-all">
                      {Array.from(watch('file'))[0]
                        ?.name?.split('.')[0]
                        .substring(0, 20)}
                      ...{Array.from(watch('file'))[0]?.name?.split('.')[1]}
                    </p>
                  )}
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="py-4 relative">
              <div className="flex relative">
                <TextareaAutosize
                  {...register('content')}
                  maxRows={10}
                  disabled={watch('file')?.length > 0}
                  className="outline-none py-4 pl-10 w-full resize-none rounded-lg bg-gray-100 disabled:bg-gray-300"
                  placeholder="Nội dung tin nhắn..."
                  value={watch('content')}
                  onKeyDown={e => {
                    socket.emit('typing', {
                      roomId: page,
                      userId: user?.data?.data?._id,
                    });
                    if (e.key === 'Enter' && e.shiftKey === false) {
                      e.preventDefault();
                      submitButton?.current?.click();
                      resetField('content');
                    }
                  }}
                  onBlur={() => {
                    socket.emit('stop_typing', {
                      roomId: page,
                      userId: user?.data?.data?._id,
                    });
                  }}
                />
                <Dropdown
                  trigger={['click']}
                  placement="top"
                  overlay={
                    <ul className="bg-white shadow rounded-lg overflow-hidden">
                      <li>
                        <label
                          className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          htmlFor="file"
                        >
                          <DocumentUpload />
                          <span className="text-gray-800 font-mono font-semibold">
                            Gửi file
                          </span>
                          <input
                            type="file"
                            id="file"
                            className="hidden"
                            accept="image/*, video/*"
                            {...register('file')}
                          />
                        </label>
                      </li>
                    </ul>
                  }
                >
                  <button
                    type="button"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                  >
                    <AddCircle variant="Bulk" />
                  </button>
                </Dropdown>

                <Dropdown
                  trigger={['click']}
                  overlay={
                    <div className="shadow rounded-lg overflow-hidden">
                      <EmojiPicker
                        onEmojiSelect={e => {
                          const content = getValues('content');
                          setValue('content', content + e?.native);
                          setFocus('content');
                        }}
                      />
                    </div>
                  }
                >
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <EmojiNormal />
                  </button>
                </Dropdown>
              </div>

              <button className="hidden" type="submit" ref={submitButton} />
              <button
                type="button"
                className={`${
                  watch('file')?.length > 0 ? 'block' : 'hidden'
                } absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 rounded-lg text-white font-bold px-4 py-2 hover:bg-blue-800 transition-colors duration-150`}
                onClick={uploadFile}
              >
                Gửi
              </button>
            </form>
          </div>
          {/* room form start end*/}
        </div>
      )}
    </>
  );
}
