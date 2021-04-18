import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const roundSlice = createSlice({
  name: "round",
  initialState: {
    list: [],
    souslist: [],
    points: "",
    loading: false,
    postdetailsLoading: false,
    errors: { message: "", postmessage: "" },
    onsuccess: {},
    onpostsuccess: {},
  },
  reducers: {
    roundRequested: (state, action) => {
      state.loading = true;
      state.list = [];
      state.souslist = [];
      state.onsuccess = {};
      state.errors.message = "";
    },

    roundRequestFail: (state, action) => {
      state.loading = false;
      state.souslist = [];
      state.errors.message = action.payload.message;
    },
    roundReceived: (state, action) => {
      state.list = action.payload.data;

      state.loading = false;
      state.onsuccess.message = action.payload.message;
      for (let i = 0; i < state.list.length; i++) {
        state.souslist[i] = [state.list[i].id, ""];
      }
    },
    sousListroundpostRequest: (state, action) => {
      state.postdetailsLoading = true;
      state.onpostsuccess = {};
      state.errors.postmessage = "";
    },
    sousListroundupdated: (state, action) => {
      for (let i = 0; i < state.souslist.length; i++) {
        if (state.souslist[i][0] == action.payload[0]) {
          state.souslist[i][1] = action.payload[1];
        }
      }
    },

    sousListroundBackendpostd: (state, action) => {
      state.postdetailsLoading = false;
      state.points = action.payload.data;
      state.onpostsuccess.message = action.payload.message;
    },

    sousListroundpostRequestFail: (state, action) => {
      state.postdetailsLoading = false;
      state.onpostsuccess = {};

      state.errors.postmessage = action.payload.message;
    },
    roundServerFail: (state, action) => {
      state.loading = false;
      state.postdetailsLoading = false;
    },
  },
});

export const {
  roundReceived,
  roundRequested,
  roundRequestFail,
  roundServerFail,
  sousListroundupdated,
  sousListroundpostRequest,
  sousListroundBackendpostd,
  sousListroundpostRequestFail,
} = roundSlice.actions;
const url = config.round;

export const loadRound = (parametres) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + parametres,
      onStart: roundRequested.type,
      onError: roundRequestFail.type,
      onSuccess: roundReceived.type,
      onServerFail: roundServerFail.type,
    })
  );
};

export const postRoundanswers = (params, answers) =>
  actions.apiCallBegan({
    url: url + params,
    onStart: sousListroundpostRequest.type,
    onSuccess: sousListroundBackendpostd.type,
    onError: sousListroundpostRequestFail.type,
    onServerFail: roundServerFail.type,
    method: "post",
    data: answers,
  });

export default roundSlice.reducer;
