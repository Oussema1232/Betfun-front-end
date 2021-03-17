import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const seasonSlice = createSlice({
  name: "seasons",
  initialState: {
    list: [],
    listbydomainadmin: [],
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
    seasonsbydomainadminRequested: (state, action) => {
      state.listbydomainadmin = [];
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
    seasonsbydomainadminReceived: (state, action) => {
      state.listbydomainadmin = action.payload.data;

      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    seasonUpdateRequest: (state, action) => {
      state.error = {};
      state.loading = true;
      state.onsuccess = {};

      state.errors = {};
    },
    seasonUpdated: (state, action) => {
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
  seasonUpdated,
  seasonsRequested,
  seasonUpdateRequest,
  seasonsRequestFail,
  seasonServerFail,
  seasonsbydomainadminRequested,
  seasonsbydomainadminReceived,
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
export const loadSeasonbydomainadmin = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: seasonsbydomainadminRequested.type,
      onError: seasonsRequestFail.type,
      onSuccess: seasonsbydomainadminReceived.type,
      onServerFail: seasonServerFail.type,
    })
  );
};

export const updateSeason = (parametres, season) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: seasonUpdateRequest.type,
      onError: seasonsRequestFail.type,
      onSuccess: seasonUpdated.type,
      onServerFail: seasonServerFail.type,
      url: url + parametres,
      method: "put",
      data: season,
    })
  );
};
export const postSeason = (season) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: seasonsRequested.type,
      onError: seasonsRequestFail.type,
      onSuccess: seasonUpdated.type,
      onServerFail: seasonServerFail.type,
      url: url,
      method: "post",
      data: season,
    })
  );
};

export const deleteSeason = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: seasonUpdateRequest.type,
      onError: seasonsRequestFail.type,
      onSuccess: seasonUpdated.type,
      onServerFail: seasonServerFail.type,
      url: url + params,
      method: "delete",
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
