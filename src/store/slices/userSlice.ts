import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  email: string | undefined;
  role: "freelancer" | "client" | undefined;
}

const initialState: UserState = {
  isAuthenticated: false,
  email: undefined,
  role: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { isAuthenticated } = action.payload;
      return { ...state, isAuthenticated };
    },
    setSignIn: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSignOut: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSignIn, setSignOut, setAuth } = userSlice.actions;

export default userSlice.reducer;
