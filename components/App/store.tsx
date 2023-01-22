import { configureStore } from '@reduxjs/toolkit';

import hexaReducer from './hexaSlice';

export const store = configureStore({
  reducer: {
    hexa: hexaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
