import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Avatar } from '../../components/Avatar';
import ActionFollowButton from '../../components/ActionFollowButton';

function UserItem(props) {
  return (
    <div className="flex gap-2 items-center hover:bg-gray-50 justify-between rounded-lg p-4 mb-4">
      <div className="flex gap-2 items-center">
        <Avatar src={props?.avatarUrl} status={props?.status} />
        <div>
          <p className="font-bold">{props?.fullname}</p>
          <Link to={`/${props?.username}`}>
            <p className="text-sm text-gray-400 line-clamp-1 hover:underline">
              @{props?.username}
            </p>
          </Link>
        </div>
      </div>
      <div className="w-fit">
        <ActionFollowButton username={props?.username} />
      </div>
    </div>
  );
}
export default UserItem;
