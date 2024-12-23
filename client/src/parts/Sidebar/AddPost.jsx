import { Edit } from 'iconsax-react';
import { Link, useLocation } from 'react-router-dom';
export function AddPost() {
  const pathname = useLocation()?.pathname;
  return (
    <Link to={'/compose/post'}>
      <div className="flex p-2.5 xl:m-0 m-auto bg-gray-100 text-blue-600 font-bold w-fit rounded-xl delay-75 duration-100 transition-all gap-4">
        <Edit variant="Bold" />
        <span className="text-lg hidden xl:inline">Viết bài</span>
      </div>
    </Link>
  );
}
