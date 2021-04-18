import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const leagueSlice = createSlice({
  name: "leagues",
  initialState: {
    list: [],
    monthsPlayedatdomain: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    leaguesRequested: (state, action) => {
      state.loading = true;
      state.monthsPlayedatdomain = [];
      state.list = [];
      state.onsuccess = {};
      state.errors = {};
    },
    leaguesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    leaguesReceived: (state, action) => {
      state.list = action.payload.data;
      if (state.list.length >= 1) {
        state.monthsPlayedatdomain = state.list[0].months;
      }
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    leagueServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  leaguesReceived,
  leaguesRequested,
  leaguesRequestFail,
  leagueServerFail,
} = leagueSlice.actions;
const url = config.leagues;

export const loadLeagues = (parametres) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + parametres,
      onStart: leaguesRequested.type,
      onError: leaguesRequestFail.type,
      onSuccess: leaguesReceived.type,
      onServerFail: leagueServerFail.type,
    })
  );
};

export const createLeague = (league) =>
  actions.apiCallBegan({
    url: url,
    method: "post",
    data: league,
  });

export default leagueSlice.reducer;
