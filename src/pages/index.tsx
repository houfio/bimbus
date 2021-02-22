import { useGetUser } from 'services/api';

import { Container } from '../components/Container';

export default function Index() {
  const { data, isLoading, isError } = useGetUser({ username: 'lex' });

  return (
    <Container>
      {isLoading ? 'Loading' : isError ? 'Error' : JSON.stringify(data)}
    </Container>
  );
}
