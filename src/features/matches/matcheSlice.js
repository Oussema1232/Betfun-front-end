import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const matcheSlice = createSlice({
  name: "matches",
  initialState: {
    list: [],

    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    matchesRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    matchesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load matches";
    },
    matchesReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    matcheServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  matchesReceived,
  matchesRequested,
  matchesRequestFail,
  matcheServerFail,
} = matcheSlice.actions;
const url = config.matches;

export const loadMatches = (parametres) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + parametres,
      onStart: matchesRequested.type,
      onError: matchesRequestFail.type,
      onSuccess: matchesReceived.type,
      onServerFail: matcheServerFail.type,
    })
  );
};

export default matcheSlice.reducer;
