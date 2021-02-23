import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from '../types';

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: process.browser ? localStorage.getItem('token') || undefined : undefined
  },
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;

      localStorage.setItem('token', payload);
    }
  }
});

export const { setToken } = slice.actions;

export function selectToken(state: State) {
  return state.auth.token;
}

export default slice.reducer;
