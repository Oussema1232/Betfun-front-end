import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const matcheSlice = createSlice({
  name: "matches",
  initialState: {
    list: [],
    souslist: [],
    fixturegameweeks: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    matchesRequested: (state, action) => {
      state.loading = true;
      state.souslist = [];
      state.fixturegameweeks = [];
      state.onsuccess = {};
      state.errors = {};
    },

    sousListMatchguessescreated: (state, action) => {
      for (let i = 0; i < state.souslist.length; i++) {
        if (state.souslist[i][0] == action.payload.idMatch) {
          state.souslist[i][1] = action.payload.guess;
        }
      }
    },
    matchesRequestFail: (state, action) => {
      state.loading = false;
      state.souslist = [];
      state.errors.message = "Couldn't load matches";
    },
    matchesReceived: (state, action) => {
      state.list = action.payload.data ? action.payload.data : [];
      if (state.list.length >= 1) {
        for (let i = 0; i < state.list[0].days.length; i++) {
          for (let j = 0; j < state.list[0].days[i].matches.length; j++) {
            state.souslist.push([state.list[0].days[i].matches[j].idMatch, ""]);
          }
        }

        for (let i = 0; i < state.list.length; i++) {
          state.fixturegameweeks.push({
            id: state.list[i].gameweekId,
            name: state.list[i].gameweekname,
          });
        }
      }
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    matcheServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  matchesReceived,
  sousListMatchguessescreated,
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
