import { createSlice } from "@reduxjs/toolkit";

export const currentDomainSlice = createSlice({
  name: "currentdomain",
  initialState: {
    data: {},
  },

  reducers: {
    savecurrentDomain: (state, action) => {
      state.data.name = action.payload.domainname;
      state.data.logo = action.payload.logo;
      state.data.id = action.payload.id;
    },
  },
});

export const { savecurrentDomain } = currentDomainSlice.actions;

export default currentDomainSlice.reducer;
