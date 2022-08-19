import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

interface UserState {
  authToken: string | undefined;
  email: string | undefined;
  role: "freelancer" | "client" | undefined;
  id: number | undefined;
}

const initialState: UserState = {
  authToken: undefined,
  email: undefined,
  role: undefined,
  id: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSignIn: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSignOut: () => initialState,
  },
});

const persistConfig = {
  key: "user",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setSignIn, setSignOut, setUser } = userSlice.actions;
export default userPersistedReducer;
