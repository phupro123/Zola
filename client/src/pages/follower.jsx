import User from '~/api/User';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Head from '../parts/Follow/Head';
import Tabs from '../parts/Follow/Tabs';
import UsersFollower from '../parts/Follow/UsersFollower';

export default function Follower() {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['getFollowers', username],
    queryFn: () => User.getFollowers(username),
  });
  const user = queryClient.getQueryState(['getCurrentUser']);

  return (
    <>
      <Head children={<Tabs />} query={user} />
      <UsersFollower query={query} />
    </>
  );
}
