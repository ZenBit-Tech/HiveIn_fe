import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import setUserApi from "services/user/setUserAPI";
import authApi from "services/auth/setAuthAPI";

import counterReducer from "store/slices/counterSlice";
import userPersistedReducer from "store/slices/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [setUserApi.reducerPath]: setUserApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const userPersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
