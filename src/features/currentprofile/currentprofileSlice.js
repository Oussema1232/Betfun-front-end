import { createSlice } from "@reduxjs/toolkit";

export const currentProfileSlice = createSlice({
  name: "currentprofile",
  initialState: {
    data: {},
  },

  reducers: {
    savecurrentProfile: (state, action) => {
      state.data.username = action.payload.username;
      state.data.id = action.payload.id;
      state.data.language = action.payload.language;
      state.data.gender = action.payload.gender;
      state.data.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { savecurrentProfile } = currentProfileSlice.actions;

export default currentProfileSlice.reducer;
