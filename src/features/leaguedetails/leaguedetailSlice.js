import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const leaguedetailSlice = createSlice({
  name: "leaguedetails",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    leaguedetailsRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    leaguedetailsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    leaguedetailsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    leaguedetailServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  leaguedetailsReceived,
  leaguedetailsRequested,
  leaguedetailsRequestFail,
  leaguedetailServerFail,
} = leaguedetailSlice.actions;
const url = config.leagues;

export const loadLeaguedetails = (parametres) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + parametres,
      onStart: leaguedetailsRequested.type,
      onError: leaguedetailsRequestFail.type,
      onSuccess: leaguedetailsReceived.type,
      onServerFail: leaguedetailServerFail.type,
    })
  );
};

export default leaguedetailSlice.reducer;
