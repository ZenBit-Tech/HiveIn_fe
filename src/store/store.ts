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
import { getProfileInfoApi } from "services/profileInfo/profileInfoAPI";
import { getSkillsOrCategory } from "services/categoriesAndSkills/categoriesAndSkills";
import jobsApi from "services/jobs/jobs.api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [setUserApi.reducerPath]: setUserApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [getProfileInfoApi.reducerPath]: getProfileInfoApi.reducer,
    [getSkillsOrCategory.reducerPath]: getSkillsOrCategory.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(setUserApi.middleware)
      .concat(authApi.middleware)
      .prepend(getProfileInfoApi.middleware)
      .prepend(getSkillsOrCategory.middleware),
});

export const userPersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
