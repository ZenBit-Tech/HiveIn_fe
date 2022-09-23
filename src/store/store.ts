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
import userPersistedReducer from "store/slices/userSlice";
import setJobPostsAPI from "services/jobPosts/setJobPostsAPI";
import proposalsApi from "services/jobPosts/proposalsAPI";
import { getProfileInfoApi } from "services/profileInfo/profileInfoAPI";
import { getSkillsOrCategory } from "services/categoriesAndSkills/categoriesAndSkills";
import getTalentApi from "services/jobOwner/talentAPI";
import contractApi from "services/contract/contractApi";
import forgotPassword from "services/auth/forgotPassword";
import freelancerApi from "services/freelancer/freelancerAPI";

export const store = configureStore({
  reducer: {
    [setUserApi.reducerPath]: setUserApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [forgotPassword.reducerPath]: forgotPassword.reducer,
    [getProfileInfoApi.reducerPath]: getProfileInfoApi.reducer,
    [getSkillsOrCategory.reducerPath]: getSkillsOrCategory.reducer,
    [setJobPostsAPI.reducerPath]: setJobPostsAPI.reducer,
    [proposalsApi.reducerPath]: proposalsApi.reducer,
    [getTalentApi.reducerPath]: getTalentApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
    [freelancerApi.reducerPath]: freelancerApi.reducer,
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
      .concat(proposalsApi.middleware)
      .concat(getTalentApi.middleware)
      .concat(contractApi.middleware)
      .prepend(getProfileInfoApi.middleware)
      .prepend(getSkillsOrCategory.middleware)
      .prepend(freelancerApi.middleware),
});

export const userPersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
