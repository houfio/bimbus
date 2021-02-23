import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@rtk-incubator/rtk-query';

import api, { middleware } from '../services/api';
import auth from '../services/auth';

export const store = configureStore({
  reducer: {
    api,
    auth
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

setupListeners(store.dispatch);
