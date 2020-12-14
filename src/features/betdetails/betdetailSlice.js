import { createSlice } from "@reduxjs/toolkit";

import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const betdetailSlice = createSlice({
  name: "betdetails",
  initialState: {
    list: [],
    souslist: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    betdetailsRequested: (state, action) => {
      state.loading = true;
      // state.list = [];
      state.souslist = [];
      state.onsuccess = {};
      state.errors = {};
    },

    sousListBetdetailsUpdated: (state, action) => {
      for (let i = 0; i < state.souslist.length; i++) {
        if (state.souslist[i].idMatch == action.payload.idMatch) {
          state.souslist[i].guess = action.payload.guess;
        }
      }
    },

    betdetailsRequestFail: (state, action) => {
      state.loading = false;
      state.souslist = [];
      state.errors.message = "Couldn't load betdetails";
    },
    betdetailsReceived: (state, action) => {
      state.list = action.payload.data;

      state.loading = false;
      state.onsuccess.message = action.payload.message;
      for (let i = 0; i < state.list.length; i++) {
        state.souslist[i] = {
          idMatch: state.list[i].idMatch,
          guess: `'${state.list[i].guess}'`,
        };
      }
    },
    betdetailServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  betdetailsReceived,
  betdetailsRequested,
  betdetailsRequestFail,
  betdetailServerFail,
  sousListBetdetailsUpdated,
} = betdetailSlice.actions;
const url = config.betdetails;

export const loadBetdetails = (parametres) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + parametres,
      onStart: betdetailsRequested.type,
      onError: betdetailsRequestFail.type,
      onSuccess: betdetailsReceived.type,
      onServerFail: betdetailServerFail.type,
    })
  );
};

export const editbetdetailsguesses = (id, guesses) =>
  actions.apiCallBegan({
    url: `${url}/${id}`,
    method: "put",
    data: { betdetails: guesses },
    // onSuccess: bugEdited.type,
  });

export default betdetailSlice.reducer;
