import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const leaguegenreSlice = createSlice({
  name: "leaguesgenres",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    leaguesgenresRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    leaguesgenresRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    leaguesgenreUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    leaguesgenresReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    leaguesgenreServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  leaguesgenresReceived,
  leaguesgenresRequested,
  leaguesgenresRequestFail,
  leaguesgenreServerFail,
  leaguesgenreUpdated,
} = leaguegenreSlice.actions;
const url = config.leaguesgenres;

export const loadLeaguesgenres = () => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url,
      onStart: leaguesgenresRequested.type,
      onError: leaguesgenresRequestFail.type,
      onSuccess: leaguesgenresReceived.type,
      onServerFail: leaguesgenreServerFail.type,
    })
  );
};

export const updateLeaguegenre = (parametres, leaguesgenre) => (
  dispatch,
  getState
) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: leaguesgenresRequested.type,
      onError: leaguesgenresRequestFail.type,
      onSuccess: leaguesgenreUpdated.type,
      onServerFail: leaguesgenreServerFail.type,
      url: url + parametres,
      method: "put",
      data: leaguesgenre,
    })
  );
};
export const postLeaguegenre = (leaguesgenre) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: leaguesgenresRequested.type,
      onError: leaguesgenresRequestFail.type,
      onSuccess: leaguesgenreUpdated.type,
      onServerFail: leaguesgenreServerFail.type,
      url: url,
      method: "post",
      data: leaguesgenre,
    })
  );
};

export const deleteLeaguegenre = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: leaguesgenresRequested.type,
      onError: leaguesgenresRequestFail.type,
      onSuccess: leaguesgenreUpdated.type,
      onServerFail: leaguesgenreServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default leaguegenreSlice.reducer;
