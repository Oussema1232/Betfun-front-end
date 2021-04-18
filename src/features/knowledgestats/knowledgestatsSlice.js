import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const knowledgestatsSlice = createSlice({
  name: "knowledgestats",
  initialState: {
    list: { categories: [], totalpoints: "" },
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    knowledgestatsRequested: (state, action) => {
      state.list = { categories: [], totalpoints: "" };
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    knowledgestatsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    knowledgestatsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },

    knowledgestatsServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  knowledgestatsReceived,
  knowledgestatsRequested,
  knowledgestatsRequestFail,
  knowledgestatsServerFail,
} = knowledgestatsSlice.actions;
const url = config.knowledgestats;

export const loadKnowledgestats = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: knowledgestatsRequested.type,
      onError: knowledgestatsRequestFail.type,
      onSuccess: knowledgestatsReceived.type,
      onServerFail: knowledgestatsServerFail.type,
    })
  );
};

export default knowledgestatsSlice.reducer;
