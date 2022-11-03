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
import userPersistedReducer from "store/slices/userSlice";
import setNotificationsAPI from "services/notifications/setNotificationsAPI";
import isDraftReducer from "store/slices/isDraftSlice";
import apiSlice from "services/api/apiSlice";

export const store = configureStore({
  reducer: {
    isDraft: isDraftReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [setNotificationsAPI.reducerPath]: setNotificationsAPI.reducer,
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(setNotificationsAPI.middleware)
      .concat(apiSlice.middleware),
});

export const userPersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
