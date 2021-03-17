import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const domainSlice = createSlice({
  name: "domains",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    domainsRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    domainsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    domainsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    domainUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    domainServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  domainsReceived,
  domainsRequested,
  domainUpdated,
  domainsRequestFail,
  domainServerFail,
} = domainSlice.actions;
const url = config.domains;

export const loadDomains = () => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url,
      onStart: domainsRequested.type,
      onError: domainsRequestFail.type,
      onSuccess: domainsReceived.type,
      onServerFail: domainServerFail.type,
    })
  );
};
export const updateDomain = (parametres, domain) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: domainsRequested.type,
      onError: domainsRequestFail.type,
      onSuccess: domainUpdated.type,
      onServerFail: domainServerFail.type,
      url: url + parametres,
      method: "put",
      data: domain,
    })
  );
};
export const postDomain = (domain) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: domainsRequested.type,
      onError: domainsRequestFail.type,
      onSuccess: domainUpdated.type,
      onServerFail: domainServerFail.type,
      url: url,
      method: "post",
      data: domain,
    })
  );
};

export const deleteDomain = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: domainsRequested.type,
      onError: domainsRequestFail.type,
      onSuccess: domainUpdated.type,
      onServerFail: domainServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default domainSlice.reducer;
