import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const suggestionSlice = createSlice({
  name: "suggestions",
  initialState: {
    list: [],
    loading: false,
    loadingpost: false,
    errors: {},
    errorspost: {},
    onsuccess: {},
    onsuccesspost: {},
  },
  reducers: {
    suggestionsRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    suggestionsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    suggestionsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    suggestionpostRequested: (state, action) => {
      state.loadingpost = true;
      state.onsuccesspost = {};
      state.errorspost = {};
    },
    suggestionPosted: (state, action) => {
      state.loadingpost = false;
      state.onsuccesspost.message = action.payload.message;
    },
    suggestionDeleted: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    suggestionpostRequestFail: (state, action) => {
      state.loadingpost = false;
      state.errorspost.message = action.payload.message;
    },
    suggestionServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  suggestionsReceived,
  suggestionPosted,
  suggestionDeleted,
  suggestionpostRequested,
  suggestionpostRequestFail,
  suggestionsRequested,
  suggestionsRequestFail,
  suggestionServerFail,
} = suggestionSlice.actions;
const url = config.suggestions;

export const loadSuggestions = () => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url,
      onStart: suggestionsRequested.type,
      onError: suggestionsRequestFail.type,
      onSuccess: suggestionsReceived.type,
      onServerFail: suggestionServerFail.type,
    })
  );
};

export const postSuggestion = (params, suggestion) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: suggestionpostRequested.type,
      onError: suggestionpostRequestFail.type,
      onSuccess: suggestionPosted.type,
      onServerFail: suggestionServerFail.type,
      url: url + params,
      method: "post",
      data: suggestion,
    })
  );
};

export const deleteSuggestion = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: suggestionsRequested.type,
      onError: suggestionsRequestFail.type,
      onSuccess: suggestionDeleted.type,
      onServerFail: suggestionServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default suggestionSlice.reducer;
