import { useNavigate, useParams } from 'react-router-dom';
import Tabs from './Tabs';
import { ArrowLeft2 } from 'iconsax-react';
import { userInfoUser } from '../../hooks/user';

export default function Head() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { data: info } = userInfoUser(username);
  return (
    <div className="sticky top-0 z-10 backdrop-blur">
      <div className="flex items-center py-2.5 px-2 justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="rounded-full p-2 hover:bg-gray-50"
          >
            <ArrowLeft2 size={18} />
          </button>
          <div>
            <p className="font-bold text-xl">{info?.data?.data?.fullname}</p>
            <p className="text-gray-600 text-sm">
              @{info?.data?.data?.username}
            </p>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  );
}
