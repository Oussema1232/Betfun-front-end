import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const leaguegenreSlice = createSlice({
  name: "leaguesgenres",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    leaguesgenresRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    leaguesgenresRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load leaguesgenres";
    },
    leaguesgenresReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    leaguesgenreServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  leaguesgenresReceived,
  leaguesgenresRequested,
  leaguesgenresRequestFail,
  leaguesgenreServerFail,
} = leaguegenreSlice.actions;
const url = config.leaguesgenres;

export const loadLeaguesgenres = () => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url,
      onStart: leaguesgenresRequested.type,
      onError: leaguesgenresRequestFail.type,
      onSuccess: leaguesgenresReceived.type,
      onServerFail: leaguesgenreServerFail.type,
    })
  );
};

export default leaguegenreSlice.reducer;
