import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const verifybetSlice = createSlice({
  name: "verifybet",
  initialState: {
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    verifybetRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    verifybetRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    verifybetReceived: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },

    setdefault: (state, action) => {
      state.onsuccess = {};
      state.errors = {};
    },
    verifybetServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  verifybetReceived,
  verifybetRequested,
  verifybetRequestFail,
  verifybetServerFail,
  setdefault,
} = verifybetSlice.actions;
const url = config.verifybet;

export const postVerifybet = (verifybet) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: verifybetRequested.type,
      onError: verifybetRequestFail.type,
      onSuccess: verifybetReceived.type,
      onServerFail: verifybetServerFail.type,
      url: url,
      method: "post",
      data: verifybet,
    })
  );
};

export default verifybetSlice.reducer;
