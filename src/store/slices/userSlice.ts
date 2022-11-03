import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

interface UserState {
  authToken?: string;
  refreshToken?: string;
  email?: string;
  firstName?: string;
  description?: string;
  role?: "freelancer" | "client";
}

const initialState: UserState = {
  authToken: undefined,
  refreshToken: undefined,
  email: undefined,
  role: undefined,
  firstName: undefined,
  description: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      const { authToken } = payload;
      return { ...state, authToken };
    },
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

export const { setToken, setUser, setSignOut } = userSlice.actions;
export default userPersistedReducer;
