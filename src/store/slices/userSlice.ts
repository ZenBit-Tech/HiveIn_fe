import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

interface UserState {
  authToken: string | null;
  email: string | null;
  role: "freelancer" | "client" | null;
  id: number | null;
}

const initialState: UserState = {
  authToken: null,
  email: null,
  role: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      const { authToken, email, id } = action.payload;
      return { ...state, authToken, email, id };
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

export const { setSignIn, setSignOut, setAuthToken } = userSlice.actions;
export default userPersistedReducer;
