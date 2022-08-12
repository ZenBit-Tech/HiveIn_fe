import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

interface UserState {
  isAuthenticated: boolean;
  token: string | undefined;
  email: string | undefined;
  role: "freelancer" | "client" | undefined;
}

const initialState: UserState = {
  isAuthenticated: false,
  token: undefined,
  email: undefined,
  role: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { isAuthenticated } = action.payload;
      return { ...state, isAuthenticated };
    },
    setToken: (state, action) => {
      const { token } = action.payload;
      return { ...state, token };
    },
    setSignIn: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSignOut: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const persistConfig = {
  key: "user",
  storage,
  blacklist: ["isAuthenticated"],
};

const userPersistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setSignIn, setSignOut, setAuth, setToken } = userSlice.actions;
export default userPersistedReducer;
