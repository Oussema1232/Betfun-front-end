import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const userdomainSlice = createSlice({
  name: "userdomains",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    userdomainsRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    userdomainsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load userdomains";
    },
    userdomainsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    userdomainServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  userdomainsReceived,
  userdomainsRequested,
  userdomainsRequestFail,
  userdomainServerFail,
} = userdomainSlice.actions;
const url = config.userdomains;

export const loadUserdomains = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: userdomainsRequested.type,
      onError: userdomainsRequestFail.type,
      onSuccess: userdomainsReceived.type,
      onServerFail: userdomainServerFail.type,
    })
  );
};

export const selectCountryById = (userId) =>
  createSelector(
    (state) => state.betfundata.userdomains.list,
    (users) => users.filter((user) => user.id === userId)
  );

export default userdomainSlice.reducer;
