import { setToken } from 'services/auth';

import { Container } from '../../components/Container';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import { useDispatch } from '../../hooks/useDispatch';

export default function App() {
  const dispatch = useDispatch();

  useAuthGuard();

  return (
    <Container>
      App
      <button onClick={() => dispatch(setToken())}>
        logout
      </button>
    </Container>
  );
}
