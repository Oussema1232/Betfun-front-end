import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const gameweekSlice = createSlice({
  name: "gameweeks",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    gameweeksRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    gameweeksRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load gameweeks";
    },
    gameweeksReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    gameweekServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  gameweeksReceived,
  gameweeksRequested,
  gameweeksRequestFail,
  gameweekServerFail,
} = gameweekSlice.actions;
const url = config.gameweeks;

export const loadGameweeks = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: gameweeksRequested.type,
      onError: gameweeksRequestFail.type,
      onSuccess: gameweeksReceived.type,
      onServerFail: gameweekServerFail.type,
    })
  );
};

export const selectCountryById = (userId) =>
  createSelector(
    (state) => state.betfundata.gameweeks.list,
    (users) => users.filter((user) => user.id === userId)
  );

export default gameweekSlice.reducer;
