import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const betSlice = createSlice({
  name: "bets",
  initialState: {
    list: [],

    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    betsRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    betsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load bets";
    },
    betsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    betServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  betsReceived,
  betsRequested,
  betsRequestFail,
  betServerFail,
} = betSlice.actions;
const url = config.bets;

export const loadBets = (parametres) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + parametres,
      onStart: betsRequested.type,
      onError: betsRequestFail.type,
      onSuccess: betsReceived.type,
      onServerFail: betServerFail.type,
    })
  );
};

export default betSlice.reducer;
