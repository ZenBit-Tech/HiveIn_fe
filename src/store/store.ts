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
import { getUserContactInfoApi } from "services/contactInfo/contactInfoAPI";
import { getProfileInfoApi } from "services/profileInfo/profileInfoAPI";
import { getProfileInfoAPI } from "services/categoriesAndSkills/categoriesAndSkills";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [setUserApi.reducerPath]: setUserApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [getUserContactInfoApi.reducerPath]: getUserContactInfoApi.reducer,
    [getProfileInfoApi.reducerPath]: getProfileInfoApi.reducer,
    [getProfileInfoAPI.reducerPath]: getProfileInfoAPI.reducer,
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(getUserContactInfoApi.middleware)
      .prepend(getProfileInfoApi.middleware)
      .prepend(getProfileInfoAPI.middleware),
});

export const userPersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
