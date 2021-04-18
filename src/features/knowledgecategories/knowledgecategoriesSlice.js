import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const knowledgecategoriesSlice = createSlice({
  name: "knowledgecategories",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    knowledgecategoriesRequested: (state, action) => {
      state.list = [];
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    knowledgecategoriesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    knowledgecategoriesReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },

    knowledgecategoriesServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  knowledgecategoriesReceived,
  knowledgecategoriesRequested,
  knowledgecategoriesRequestFail,
  knowledgecategoriesServerFail,
} = knowledgecategoriesSlice.actions;
const url = config.knowledgecategories;

export const loadKnowledgecategories = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: knowledgecategoriesRequested.type,
      onError: knowledgecategoriesRequestFail.type,
      onSuccess: knowledgecategoriesReceived.type,
      onServerFail: knowledgecategoriesServerFail.type,
    })
  );
};

export default knowledgecategoriesSlice.reducer;
