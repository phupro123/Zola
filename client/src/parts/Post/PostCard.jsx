import { Link } from 'react-router-dom';
import _ from 'lodash';
import parse from 'html-react-parser';
import Files from '../../components/Files';
import { Avatar } from '../../components/Avatar';
import { formatNumber } from '../../utils';
import { CloseCircle, More } from 'iconsax-react';
import { Portal } from 'react-portal';
import vi from 'date-fns/locale/vi';
import { formatDistanceToNow } from 'date-fns';
import Dropdown from 'rc-dropdown';
import { useUser } from '../../hooks/auth';
import { useDeletePost } from '../../hooks/post';
import { useState } from 'react';

const ConfirmDeletePost = props => {
  const { mutate } = useDeletePost(props?.username);
  return (
    <>
      {props?.open && (
        <Portal>
          <div className="fixed inset-0 flex justify-center items-center bg-black/20">
            <div className="p-4 bg-white rounded-lg w-56">
              <p className="font-bold text-lg text-center">
                Bạn có chắc xóa bài viết?
              </p>
              <p className="text-sm text-gray-500 text-justify mb-4">
                Bài viết sẽ bị xóa vĩnh viễn!
              </p>
              <div className="flex gap-4 w-full items-center justify-center">
                <button
                  type="button"
                  className="px-4 py-2 font-bold rounded-lg hover:bg-gray-50"
                  onClick={props?.onCancel}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-400 rounded-lg font-bold text-white hover:bg-red-500 duration-150 transition-colors"
                  onClick={() => {
                    mutate(props?.id);
                    props?.onCancel();
                  }}
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
export default function PostCard(props) {
  const { data } = useUser();
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <div className="flex p-4 text-gray-900 gap-4 transition-all delay-100 mb-8 rounded-lg w-full">
      <div className="w-full">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-2">
            <Avatar src={props?.author?.avatarUrl} />
            <div>
              <strong>{props?.author?.fullname}</strong>
              <Link to={`/${props?.author?.username}`}>
                <p className="text-gray-500 text-sm hover:underline">
                  @{props?.author?.username}
                </p>
              </Link>

              <p className="text-sm text-gray-500">
                {formatNumber(props?.totalLike)} thích&nbsp;&#8226;&nbsp;
                {formatNumber(props?.totalComment)} bình luận&nbsp;&#8226;&nbsp;
                {formatDistanceToNow(new Date(props?.created_at), {
                  locale: vi,
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <Dropdown
            overlay={
              <ul className="bg-white shadow rounded-lg overflow-hidden">
                {data?.data?.data?.username === props?.author?.username && (
                  <li
                    className="px-4 py-2 hover:bg-gray-50 text-sm text-red-400 flex items-center gap-2 cursor-pointer"
                    onClick={() => setOpenDelete(true)}
                  >
                    <CloseCircle variant="Bulk" />
                    Xóa bài viết
                  </li>
                )}
              </ul>
            }
            trigger={['click']}
          >
            <button className="hover:text-blue-500" type="button">
              <More size={18} />
            </button>
          </Dropdown>
        </div>
        <Link to={`/${props?.author?.username}/post/${props?._id}`}>
          <p className="leading-relaxed line-clamp-2 hover:text-blue-500 mb-4">
            {parse(props?.content)}
          </p>
        </Link>
        <Files attach_files={props?.attach_files} />
        <ConfirmDeletePost
          open={openDelete}
          id={props?._id}
          username={props?.author?.username}
          onCancel={() => setOpenDelete(false)}
        />
      </div>
    </div>
  );
}
