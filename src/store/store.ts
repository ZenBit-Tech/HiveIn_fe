import { configureStore } from "@reduxjs/toolkit";
import signUpApi from "services/user/signUp";
import counterReducer from "store/slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
