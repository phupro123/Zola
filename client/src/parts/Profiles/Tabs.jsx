import clsx from 'clsx';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Lock } from 'iconsax-react';
import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/auth';

export default function Tabs() {
  const { username } = useParams();
  const { data } = useUser();
  const urls = useLocation().pathname.split('/');
  const baseUrl = urls[1];
  const nestUrl = urls[2];

  const handleClick = e => {
    if (username !== data?.data?.data.username) {
      e.preventDefault();
      toast.dismiss();
      toast.error('Bạn không thể xem nội dung này!');
    }
  };
  return (
    <div className="flex justify-between mt-4 gap-4 px-2 lg:px-0">
      <Link
        to={`/${baseUrl}`}
        className="hover:bg-gray-50 flex-grow text-center rounded-lg overflow-hidden"
      >
        <div
          className={clsx(
            'py-2.5 flex gap-4 justify-center',
            !nestUrl && 'bg-gray-50 font-bold',
          )}
        >
          <span className="line-clamp-1">Bài viết</span>
        </div>
      </Link>
      <Link
        to={`/${baseUrl}/likes`}
        className="hover:bg-gray-50 flex-grow text-center rounded-lg overflow-hidden"
        onClick={handleClick}
      >
        <div
          className={clsx(
            'py-2.5 flex gap-4 justify-center',
            nestUrl === 'likes' && 'bg-gray-50 font-bold',
          )}
        >
          <span className="line-clamp-1">Đã thích</span>
          {data?.data?.data.username !== username && <Lock size={18} />}
        </div>
      </Link>
      <Link
        to={`/${baseUrl}/gallery`}
        className="hover:bg-gray-50 flex-grow text-center rounded-lg overflow-hidden"
        onClick={handleClick}
      >
        <div
          className={clsx(
            'py-2.5 flex gap-4 justify-center',
            nestUrl === 'gallery' && 'bg-gray-50 font-bold',
          )}
        >
          <span className="line-clamp-1"> Thư viện</span>
          {data?.data?.data.username !== username && <Lock size={18} />}
        </div>
      </Link>
    </div>
  );
}
