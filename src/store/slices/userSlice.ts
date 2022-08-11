import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string | undefined;
  role: "freelancer" | "client" | undefined;
}

const initialState: UserState = {
  email: undefined,
  role: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSignOut: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSignIn, setSignOut } = userSlice.actions;

export default userSlice.reducer;
