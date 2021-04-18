import { createSlice } from "@reduxjs/toolkit";

export const currentCategorySlice = createSlice({
  name: "currentcategory",
  initialState: {
    data: {},
  },

  reducers: {
    savecurrentCategory: (state, action) => {
      state.data.Engname = action.payload.Engname;
      state.data.Arabname = action.payload.Arabname;
      state.data.id = action.payload.id;
    },
  },
});

export const { savecurrentCategory } = currentCategorySlice.actions;

export default currentCategorySlice.reducer;
