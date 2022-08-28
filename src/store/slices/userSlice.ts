import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

interface UserState {
  authToken?: string;
  email?: string;
  role?: "freelancer" | "client";
}

const initialState: UserState = {
  authToken: undefined,
  email: undefined,
  role: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserState>) => {
      return { ...state, ...payload };
    },
    setSignOut: () => initialState,
  },
});

const persistConfig = {
  key: "user",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setUser, setSignOut } = userSlice.actions;
export default userPersistedReducer;
