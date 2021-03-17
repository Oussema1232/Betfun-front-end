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
      state.errors.message = action.payload.message;
    },
    gameweeksReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    gameweekUpdated: (state, action) => {
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
  gameweekUpdated,
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

export const updateGameweek = (parametres, gameweek) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: gameweeksRequested.type,
      onError: gameweeksRequestFail.type,
      onSuccess: gameweekUpdated.type,
      onServerFail: gameweekServerFail.type,
      url: url + parametres,
      method: "put",
      data: gameweek,
    })
  );
};
export const postGameweek = (gameweek) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: gameweeksRequested.type,
      onError: gameweeksRequestFail.type,
      onSuccess: gameweekUpdated.type,
      onServerFail: gameweekServerFail.type,
      url: url,
      method: "post",
      data: gameweek,
    })
  );
};

export const deleteGameweek = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: gameweeksRequested.type,
      onError: gameweeksRequestFail.type,
      onSuccess: gameweekUpdated.type,
      onServerFail: gameweekServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default gameweekSlice.reducer;
