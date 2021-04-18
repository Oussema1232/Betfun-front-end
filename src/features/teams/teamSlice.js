import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const teamSlice = createSlice({
  name: "teams",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    teamsRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    teamsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    teamsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    teamServerFail: (state, action) => {
      state.loading = false;
    },
    teamUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
  },
});

const {
  teamsReceived,
  teamsRequested,
  teamsRequestFail,
  teamServerFail,
  teamUpdated,
} = teamSlice.actions;
const url = config.teams;

export const loadTeams = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: teamsRequested.type,
      onError: teamsRequestFail.type,
      onSuccess: teamsReceived.type,
      onServerFail: teamServerFail.type,
    })
  );
};

export const updateTeam = (parametres, team) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: teamsRequested.type,
      onError: teamsRequestFail.type,
      onSuccess: teamUpdated.type,
      onServerFail: teamServerFail.type,
      url: url + parametres,
      method: "put",
      data: team,
    })
  );
};
export const postTeam = (team) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: teamsRequested.type,
      onError: teamsRequestFail.type,
      onSuccess: teamUpdated.type,
      onServerFail: teamServerFail.type,
      url: url,
      method: "post",
      data: team,
    })
  );
};

export const deleteTeam = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: teamsRequested.type,
      onError: teamsRequestFail.type,
      onSuccess: teamUpdated.type,
      onServerFail: teamServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default teamSlice.reducer;
