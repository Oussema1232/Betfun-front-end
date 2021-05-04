import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const difficultySlice = createSlice({
  name: "dificulties",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    difficultiesRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    difficultiesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    difficultiesReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    difficultyUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    difficultyServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  difficultiesReceived,
  difficultiesRequested,
  difficultyUpdated,
  difficultiesRequestFail,
  difficultyServerFail,
} = difficultySlice.actions;
const url = config.difficulties;

export const loadDifficulties = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: difficultiesRequested.type,
      onError: difficultiesRequestFail.type,
      onSuccess: difficultiesReceived.type,
      onServerFail: difficultyServerFail.type,
    })
  );
};

export const updateDifficulty = (parametres, difficulty) => (
  dispatch,
  getState
) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: difficultiesRequested.type,
      onError: difficultiesRequestFail.type,
      onSuccess: difficultyUpdated.type,
      onServerFail: difficultyServerFail.type,
      url: url + parametres,
      method: "put",
      data: difficulty,
    })
  );
};
export const postDifficulty = (difficulty) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: difficultiesRequested.type,
      onError: difficultiesRequestFail.type,
      onSuccess: difficultyUpdated.type,
      onServerFail: difficultyServerFail.type,
      url: url,
      method: "post",
      data: difficulty,
    })
  );
};

export const deleteDifficulty = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: difficultiesRequested.type,
      onError: difficultiesRequestFail.type,
      onSuccess: difficultyUpdated.type,
      onServerFail: difficultyServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default difficultySlice.reducer;
