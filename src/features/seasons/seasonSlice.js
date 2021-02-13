import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const seasonSlice = createSlice({
  name: "seasons",
  initialState: {
    list: [],
    latestseason: {},
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    seasonsRequested: (state, action) => {
      state.list = [];
      state.error = {};
      state.loading = true;
      state.onsuccess = {};

      state.errors = {};
    },
    seasonsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load seasons";
    },
    seasonsReceived: (state, action) => {
      state.list = action.payload.data;
      state.latestseason = state.list[state.list.length - 1];
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    seasonServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  seasonsReceived,
  seasonsRequested,
  seasonsRequestFail,
  seasonServerFail,
} = seasonSlice.actions;
const url = config.seasons;

export const loadSeasons = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: seasonsRequested.type,
      onError: seasonsRequestFail.type,
      onSuccess: seasonsReceived.type,
      onServerFail: seasonServerFail.type,
    })
  );
};

export const seasonsFinished = createSelector(
  (state) => state.betfundata.seasons,
  (seasons) => seasons.list.filter((s) => s.isFinished)
);
export const seasonsUnfinished = createSelector(
  (state) => state.betfundata.seasons,
  (seasons) => seasons.list.filter((s) => !s.isFinished)
);

export default seasonSlice.reducer;
