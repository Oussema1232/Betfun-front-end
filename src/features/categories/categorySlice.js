import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    categoriesRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    categoriesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    categoriesReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    categoryUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    categoryServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  categoriesReceived,
  categoriesRequested,
  categoryUpdated,
  categoriesRequestFail,
  categoryServerFail,
} = categorySlice.actions;
const url = config.categories;

export const loadCategories = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: categoriesRequested.type,
      onError: categoriesRequestFail.type,
      onSuccess: categoriesReceived.type,
      onServerFail: categoryServerFail.type,
    })
  );
};

export const updateCategory = (parametres, category) => (
  dispatch,
  getState
) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: categoriesRequested.type,
      onError: categoriesRequestFail.type,
      onSuccess: categoryUpdated.type,
      onServerFail: categoryServerFail.type,
      url: url + parametres,
      method: "put",
      data: category,
    })
  );
};
export const postCategory = (category) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: categoriesRequested.type,
      onError: categoriesRequestFail.type,
      onSuccess: categoryUpdated.type,
      onServerFail: categoryServerFail.type,
      url: url,
      method: "post",
      data: category,
    })
  );
};

export const deleteCategory = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: categoriesRequested.type,
      onError: categoriesRequestFail.type,
      onSuccess: categoryUpdated.type,
      onServerFail: categoryServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default categorySlice.reducer;
