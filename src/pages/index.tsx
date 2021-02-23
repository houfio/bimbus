import { Container } from '../components/Container';
import { useGetUserQuery, useGetUsersQuery } from '../services/api';

export default function Index() {
  const { data, error } = useGetUsersQuery();
  const { data: data2 } = useGetUserQuery({ username: 'lex' });

  return (
    <Container>
      {data ? data.map((user) => (
        <div key={user.username}>
          {user.username} ({user.role})
        </div>
      )) : error ? (
        <div>
          Error: {JSON.stringify(error)}
        </div>
      ) : 'Loading'}
      <div>
        {JSON.stringify(data2)}
      </div>
    </Container>
  );
}
