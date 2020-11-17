import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { myToken } from "../../services/authService";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    data: {},
  },

  reducers: {
    savecurrentUser: (state, action) => {
      const token = localStorage.getItem(myToken);
      state.data = jwtDecode(token);
    },
  },
});

export const { savecurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
