import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import UserItem from './UserItem';

export default function UsersFollowing({ query }) {
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
              {query?.data?.data?.map(user => (
                <UserItem {...user} key={user?._id} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
