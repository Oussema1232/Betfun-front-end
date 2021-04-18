import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const profiledomainSlice = createSlice({
  name: "profiledomains",
  initialState: {
    list: [],
    errors: {},
    onsuccess: {},
  },
  reducers: {
    profiledomainsRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    profiledomainsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    profiledomainsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    profiledomainServerFail: (state, action) => {
      state.loading = false;
      state.loadingpost = {};
    },
  },
});

const {
  profiledomainsRequested,
  profiledomainsReceived,
  profiledomainsRequestFail,

  profiledomainServerFail,
} = profiledomainSlice.actions;
const url = config.userdomains;

export const loadProfiledomains = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: profiledomainsRequested.type,
      onError: profiledomainsRequestFail.type,
      onSuccess: profiledomainsReceived.type,
      onServerFail: profiledomainServerFail.type,
    })
  );
};

export default profiledomainSlice.reducer;
