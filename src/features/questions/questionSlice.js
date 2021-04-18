import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const questionSlice = createSlice({
  name: "questions",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    questionsRequested: (state, action) => {
      state.list = [];
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    questionsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    questionsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    questionUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    questionServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  questionsReceived,
  questionsRequested,
  questionUpdated,
  questionsRequestFail,
  questionServerFail,
} = questionSlice.actions;
const url = config.questions;

export const loadQuestions = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: questionsRequested.type,
      onError: questionsRequestFail.type,
      onSuccess: questionsReceived.type,
      onServerFail: questionServerFail.type,
    })
  );
};
export const updateQuestion = (parametres, question) => (
  dispatch,
  getState
) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: questionsRequested.type,
      onError: questionsRequestFail.type,
      onSuccess: questionUpdated.type,
      onServerFail: questionServerFail.type,
      url: url + parametres,
      method: "put",
      data: question,
    })
  );
};
export const postQuestion = (question) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: questionsRequested.type,
      onError: questionsRequestFail.type,
      onSuccess: questionUpdated.type,
      onServerFail: questionServerFail.type,
      url: url,
      method: "post",
      data: question,
    })
  );
};

export const deleteQuestion = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: questionsRequested.type,
      onError: questionsRequestFail.type,
      onSuccess: questionUpdated.type,
      onServerFail: questionServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default questionSlice.reducer;
