import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { myToken } from "../../services/authService";

export const currentUserSlice = createSlice({
  name: "currentuser",
  initialState: {
    data: { id: 6, username: "Oussema", isAdmin: true },
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
