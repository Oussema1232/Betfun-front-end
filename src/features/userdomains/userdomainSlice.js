import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const userdomainSlice = createSlice({
  name: "userdomains",
  initialState: {
    list: [],
    listsimplified: [],
    loading: false,
    loadingpost: {},
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
      state.errors.message = action.payload.message;
    },
    userdomainsReceived: (state, action) => {
      state.listsimplified = [];
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
      for (let i = 0; i < state.list.length; i++) {
        state.listsimplified[i] = {
          id: state.list[i].domainId,
          name: state.list[i].domainname,
          logo: state.list[i].logo,
        };
      }
    },
    userdomainPostRequest: (state, action) => {
      state.loadingpost = {};
      state.loadingpost = { [action.payload.id]: true };

      state.onsuccess = {};
      state.errors = {};
    },
    userdomainPosted: (state, action) => {
      state.loadingpost = {};
      state.loadingpost = { [action.payload.id]: false };
      state.list.push(action.payload.domain);
      state.listsimplified.push({
        id: action.payload.domain.domainId,
        name: action.payload.domain.domainname,
        logo: action.payload.domain.logo,
      });

      state.onsuccess.message = action.payload.message;
    },
    userdomainPostRequestFail: (state, action) => {
      state.loadingpost = {};
      state.loadingpost = { [action.payload.id]: false };

      state.errors.message = action.payload.message;
    },
    userdomainServerFail: (state, action) => {
      state.loading = false;
      state.loadingpost = {};
    },
  },
});

const {
  userdomainsRequested,
  userdomainsReceived,
  userdomainsRequestFail,
  userdomainPostRequest,
  userdomainPosted,
  userdomainPostRequestFail,
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

export const postUserdomain = (userdomain) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: userdomainPostRequest.type,
      onError: userdomainPostRequestFail.type,
      onSuccess: userdomainPosted.type,
      onServerFail: userdomainServerFail.type,
      url: url,
      method: "post",
      data: userdomain,
    })
  );
};

export default userdomainSlice.reducer;
