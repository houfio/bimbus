import { superstructResolver } from '@hookform/resolvers/superstruct';
import { useForm } from 'react-hook-form';
import { usePostLoginMutation } from 'services/api';
import { setToken } from 'services/auth';

import { Container } from '../components/Container';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useDispatch } from '../hooks/useDispatch';
import { Authenticate } from '../structs/Authenticate';

export default function Index() {
  const dispatch = useDispatch();
  const [mutate] = usePostLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: superstructResolver(Authenticate)
  });

  useAuthGuard(false, '/app');

  return (
    <Container>
      <form
        onSubmit={handleSubmit(({ username, password }) => mutate({
          username,
          password
        }).unwrap().then((data) => dispatch(setToken(data.token))))}
      >
        <div>
          <input {...register('username')}/>
          {errors.username && (
            <span>username not ok</span>
          )}
        </div>
        <div>
          <input {...register('password')}/>
          {errors.password && (
            <span>password not ok</span>
          )}
        </div>
        <button type="submit">
          submit
        </button>
      </form>
    </Container>
  );
}
