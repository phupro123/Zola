import Empty from '../../components/Empty';
import UserItem from './UserItem';
import Loading from '~/components/Loading';

export default function UsersFollower({ query }) {
  return (
    <div>
      {query?.isLoading ? (
        <Loading />
      ) : (
        <>
          {query?.data?.data?.length === 0 ? (
            <Empty />
          ) : (
            <>
              {query?.data?.data.map(user => (
                <UserItem {...user} key={user?._id} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
