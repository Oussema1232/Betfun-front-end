import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const betSlice = createSlice({
  name: "bets",
  initialState: {
    list: [],
    loading: false,
    loadingCreate: false,
    errors: {},
    onsuccess: {},
    onCreateSuccess: {},
  },
  reducers: {
    betsRequested: (state, action) => {
      state.loading = true;
      state.onCreateSuccess = {};
      state.onsuccess = {};
      state.errors = {};
      state.list = [];
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

    BetCreatedRequest: (state, action) => {
      state.loadingCreate = true;
      state.onCreateSuccess = {};
      state.errors = {};
    },
    BetBackendCreated: (state, action) => {
      state.loadingCreate = false;
      state.onCreateSuccess.message = "Bet created successfully";
    },

    BetCreatedRequestFail: (state, action) => {
      state.loadingCreate = false;

      state.errors.message = action.payload.message;
    },
    betServerFail: (state, action) => {
      state.loading = false;
      state.loadingCreate = false;
    },
  },
});

const {
  betsReceived,
  betsRequested,
  betsRequestFail,
  betServerFail,
  BetCreatedRequest,
  BetBackendCreated,
  BetCreatedRequestFail,
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

export const createBet = (bet) =>
  actions.apiCallBegan({
    onStart: BetCreatedRequest.type,
    onSuccess: BetBackendCreated.type,
    onError: BetCreatedRequestFail.type,
    onServerFail: betServerFail.type,
    url: url,
    method: "post",
    data: bet,
  });

export default betSlice.reducer;
