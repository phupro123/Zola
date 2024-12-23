import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import User from '~/api/User';
import Head from '../parts/Follow/Head';
import Tabs from '../parts/Follow/Tabs';
import UsersFollowing from '../parts/Follow/UsersFollowing';

export default function Following() {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['getFollowing', username],
    queryFn: () => User.getFollowing(username),
  });
  const user = queryClient.getQueryState(['getCurrentUser']);
  return (
    <>
      <Head children={<Tabs />} query={user} />
      <UsersFollowing query={query} />
    </>
  );
}
