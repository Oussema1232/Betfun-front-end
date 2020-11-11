import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const userSlice = createSlice({
  name: "emailtoken",
  initialState: {
    token:{}
  },

  reducers: {
    userAdded: (state, action) => {
      state.list.push(action.payload.data);
      state.onsuccess.message = action.payload.message;
    },
    addUserRequestBegan: (state, action) => {
      state.errors = {};
      state.onsuccess={}
    },
    addUserRequestFail: (state, action) => {
      state.errors.message = action.payload;
    },

    userDeleted: (state, action) => {
      return state.filter((user) => user.id !== action.payload.userId);
    },
  },
});

const {
  userAdded,
  userDeleted,
  addUserRequestFail,
  addUserRequestBegan,
} = userSlice.actions;
const url = config.confirmation;



export const confirmSignUp = (user) =>
  actions.apiCallBegan({
    url: url,
    method: "post",
    data: user,
    onStart: addUserRequestBegan.type,
    onError: addUserRequestFail.type,
    onSuccess: userAdded.type,
  });

export const selectUserById = (userId) =>
  createSelector(
    (state) => state.betfundata.users,
    (users) => users.filter((user) => user.id === userId)
  );

export default userSlice.reducer;
