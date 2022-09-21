import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const isDraftSlice = createSlice({
  name: "isDraft",
  initialState,
  reducers: {
    toggleIsDraft: (state) => {
      return !state;
    },
    setIsDraft: (_state, { payload }: PayloadAction<boolean>) => {
      return payload;
    },
  },
});

export const { toggleIsDraft, setIsDraft } = isDraftSlice.actions;
export default isDraftSlice.reducer;
