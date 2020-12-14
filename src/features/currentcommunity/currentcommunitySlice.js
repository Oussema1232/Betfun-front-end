import { createSlice } from "@reduxjs/toolkit";

export const currentCommunitySlice = createSlice({
  name: "currentcommunity",
  initialState: {
    data: {},
  },

  reducers: {
    savecurrentCommunity: (state, action) => {
      state.data.name = action.payload.communityname;
      state.data.id = action.payload.id;
    },
  },
});

export const { savecurrentCommunity } = currentCommunitySlice.actions;

export default currentCommunitySlice.reducer;
