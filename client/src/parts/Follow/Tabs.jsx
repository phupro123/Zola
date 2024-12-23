import clsx from 'clsx';
import { useParams, Link, useLocation } from 'react-router-dom';
export default function Tabs() {
  const tab = useLocation().pathname.split('/')[2];
  const { username } = useParams();
  return (
    <div className="flex justify-between gap-4">
      <Link
        to={`/${username}/follower`}
        className={clsx(
          'hover:bg-gray-50 hover:cursor-pointer flex-grow text-center px-4 py-2.5 rounded-lg',
          tab === 'follower' && 'bg-gray-50 font-bold',
        )}
      >
        Người theo dõi
      </Link>
      <Link
        to={`/${username}/following`}
        className={clsx(
          'hover:bg-gray-50 hover:cursor-pointer flex-grow text-center px-4 py-2.5 rounded-lg',
          tab === 'following' && 'bg-gray-50 font-bold',
        )}
      >
        Đang theo dõi
      </Link>
    </div>
  );
}
