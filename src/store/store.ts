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
import setJobPostsAPI from "services/jobPosts/setJobPostsAPI";
import { getProfileInfoApi } from "services/profileInfo/profileInfoAPI";
import { getSkillsOrCategory } from "services/categoriesAndSkills/categoriesAndSkills";
import getTalentApi from "services/jobOwner/talentAPI";
import forgotPassword from "services/auth/forgotPassword";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [setUserApi.reducerPath]: setUserApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [forgotPassword.reducerPath]: forgotPassword.reducer,
    [getProfileInfoApi.reducerPath]: getProfileInfoApi.reducer,
    [getSkillsOrCategory.reducerPath]: getSkillsOrCategory.reducer,
    [setJobPostsAPI.reducerPath]: setJobPostsAPI.reducer,
    [getTalentApi.reducerPath]: getTalentApi.reducer,
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
      .concat(forgotPassword.middleware)
      .concat(setJobPostsAPI.middleware)
      .concat(getTalentApi.middleware)
      .prepend(getProfileInfoApi.middleware)
      .prepend(getSkillsOrCategory.middleware),
});

export const userPersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
