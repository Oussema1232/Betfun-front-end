import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },

  reducers: {
    userAdded: (state, action) => {
      state.list.push(action.payload.data);
      state.onsuccess.message = action.payload.message;
      state.loading = false;
    },
    addUserRequestBegan: (state, action) => {
      state.errors = {};
      state.onsuccess = {};
      state.loading = true;
    },
    addUserRequestFail: (state, action) => {
      state.errors.message = action.payload;
      state.loading = false;
    },
    addServerFail: (state, action) => {
      state.loading = false;
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
  addServerFail,
} = userSlice.actions;
const url = config.users;

export const deleteUser = (userId) =>
  actions.apiCallBegan({
    url: url,
    method: "delete",
    data: userId,
    onSuccess: userDeleted.type,
    onServerFail: addServerFail.type,
  });

export const addUser = (user) =>
  actions.apiCallBegan({
    url: url,
    method: "post",
    data: user,
    onStart: addUserRequestBegan.type,
    onError: addUserRequestFail.type,
    onSuccess: userAdded.type,
    onServerFail: addServerFail.type,
  });



export const selectUserById = (userId) =>
  createSelector(
    (state) => state.betfundata.users,
    (users) => users.filter((user) => user.id === userId)
  );

export default userSlice.reducer;
