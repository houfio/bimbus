import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { selectToken } from '../services/auth';

import { useSelector } from './useSelector';

export function useAuthGuard(authenticated = true, to = '/') {
  const { push } = useRouter();
  const token = useSelector(selectToken);
  const skip = typeof document !== 'undefined' && Boolean(token) !== authenticated;

  useEffect(() => {
    if (skip) {
      void push(to);
    }
  }, [to, skip, push]);

  return skip;
}
