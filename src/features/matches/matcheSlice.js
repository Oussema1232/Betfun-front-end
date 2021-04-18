import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const matcheSlice = createSlice({
  name: "matches",
  initialState: {
    list: [],
    souslist: [],
    allmatches: [],
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
      state.allmatches = [];
      state.onsuccess = {};
      state.errors = {};
    },

    updateRequested: (state, action) => {
      state.loading = true;
    },

    sousListMatchguessescreated: (state, action) => {
      for (let i = 0; i < state.souslist.length; i++) {
        if (state.souslist[i][0] == action.payload.idMatch) {
          state.souslist[i][1] = action.payload.guess;
        }
      }
    },
    matchBingoResultscreated: (state, action) => {
      for (let i = 0; i < state.allmatches.length; i++) {
        if (state.allmatches[i].id == action.payload.id) {
          state.allmatches[i].bingo = action.payload.bingo;
          state.allmatches[i].goals1 = action.payload.goals1;
          state.allmatches[i].goals2 = action.payload.goals2;
        }
      }
    },
    matchesRequestFail: (state, action) => {
      state.loading = false;
      state.souslist = [];
      state.errors.message = action.payload.message;
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

        for (let i = 0; i < state.list.length; i++) {
          for (let j = 0; j < state.list[i].days.length; j++) {
            for (let k = 0; k < state.list[i].days[j].matches.length; k++) {
              let match = state.list[i].days[j].matches[k];
              let matchresult = {
                id: match.idMatch,
                bingo: `'${match.bingo}'`,
                goals1: match.goals1,
                goals2: match.goals2,
              };
              state.allmatches.push(matchresult);
            }
          }
        }
      }
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    matchUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    matchUpdatedfail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
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
  updateRequested,
  matchUpdated,
  matchUpdatedfail,
  matchBingoResultscreated,
} = matcheSlice.actions;
const url = config.matches;
const urlpoints = config.points;

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

export const postBingos = (bingos) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: updateRequested.type,
      onError: matchUpdatedfail.type,
      onSuccess: matchUpdated.type,
      onServerFail: matcheServerFail.type,
      url: urlpoints,
      method: "post",
      data: bingos,
    })
  );
};
export const updateMatch = (parametres, match) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: updateRequested.type,
      onError: matchUpdatedfail.type,
      onSuccess: matchUpdated.type,
      onServerFail: matcheServerFail.type,
      url: url + parametres,
      method: "put",
      data: match,
    })
  );
};
export const deleteMatch = (parametres) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: updateRequested.type,
      onError: matchUpdatedfail.type,
      onSuccess: matchUpdated.type,
      onServerFail: matcheServerFail.type,
      url: url + parametres,
      method: "delete",
    })
  );
};
export const postMatch = (match) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: updateRequested.type,
      onError: matchUpdatedfail.type,
      onSuccess: matchUpdated.type,
      onServerFail: matcheServerFail.type,
      url: url,
      method: "post",
      data: match,
    })
  );
};
export default matcheSlice.reducer;
