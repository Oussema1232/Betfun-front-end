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
      state.errors.message = "Couldn't load domains";
    },
    domainsReceived: (state, action) => {
      state.list = action.payload.data;
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

export const selectCountryById = (userId) =>
  createSelector(
    (state) => state.betfundata.domains.list,
    (users) => users.filter((user) => user.id === userId)
  );

export default domainSlice.reducer;
