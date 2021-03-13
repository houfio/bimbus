import { useDispatch as useReduxDispatch } from 'react-redux';

import { Dispatch } from '../types';

export function useDispatch() {
  return useReduxDispatch<Dispatch>();
}
