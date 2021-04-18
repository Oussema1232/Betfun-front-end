import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { myToken } from "../../services/authService";

export const currentUserSlice = createSlice({
  name: "currentuser",
  initialState: {
    data: {},
  },

  reducers: {
    savecurrentUser: (state, action) => {
      const token = localStorage.getItem(myToken);
      state.data = jwtDecode(token);
    },
    logcurrentUserout: (state, action) => {
      state.data = {};
    },
    changeUsername: (state, action) => {
      const username = action.payload.username;
      state.data.username = username;
    },

    changeLanguage: (state, action) => {
      const language = action.payload.language;
      state.data.language = language;
    },
  },
});

export const {
  savecurrentUser,
  logcurrentUserout,
  changeUsername,
  changeLanguage,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
