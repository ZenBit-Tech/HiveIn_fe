import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDraft {
  isDraft: boolean;
}

const initialState: IDraft = {
  isDraft: false,
};

const isDraftSlice = createSlice({
  name: "isDraft",
  initialState,
  reducers: {
    toggleIsDraft: (state) => {
      return { ...state, isDraft: !state.isDraft };
    },
    setIsDraft: (state, { payload }: PayloadAction<IDraft>) => {
      return { ...state, isDraft: payload.isDraft };
    },
  },
});

export const { toggleIsDraft, setIsDraft } = isDraftSlice.actions;
export default isDraftSlice.reducer;
