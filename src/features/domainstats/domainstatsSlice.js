import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const domainstatsSlice = createSlice({
  name: "domainstats",
  initialState: {
    list: {},
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    domainstatsRequested: (state, action) => {
      state.list = {};
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    domainstatsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    domainstatsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },

    domainstatsServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  domainstatsReceived,
  domainstatsRequested,
  domainstatsRequestFail,
  domainstatsServerFail,
} = domainstatsSlice.actions;
const url = config.domainstats;

export const loadDomainstats = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: domainstatsRequested.type,
      onError: domainstatsRequestFail.type,
      onSuccess: domainstatsReceived.type,
      onServerFail: domainstatsServerFail.type,
    })
  );
};

export default domainstatsSlice.reducer;
