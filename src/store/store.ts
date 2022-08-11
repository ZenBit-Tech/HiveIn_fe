import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "store/slices/counterSlice";
import userReducer from "store/slices/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
