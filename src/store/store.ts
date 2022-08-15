import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import counterReducer from "store/slices/counterSlice";
import userPersistedReducer from "store/slices/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userPersistedReducer,
  },
});

export const userPersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
