import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const leagueSlice = createSlice({
  name: "leagues",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    leaguesRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
      
    },
    leaguesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load leagues";
    },
    leaguesReceived: (state, action) => {
      state.list = action.payload.data;
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

export default leagueSlice.reducer;
