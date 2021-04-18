import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const quoteSlice = createSlice({
  name: "quotes",
  initialState: {
    list: [],
    oneQuote: {},
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    quotesRequested: (state, action) => {
      state.list = [];
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    quoteRequested: (state, action) => {
      state.loading = true;
      state.oneQuote = {};

      state.onsuccess = {};
      state.errors = {};
    },
    quotesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    quotesReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    quoteReceived: (state, action) => {
      state.oneQuote = action.payload.data;
      state.loading = false;
      
      state.onsuccess.message = action.payload.message;
    },
    quoteUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    quoteServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  quotesReceived,
  quoteReceived,
  quotesRequested,
  quoteRequested,
  quoteUpdated,
  quotesRequestFail,
  quoteServerFail,
} = quoteSlice.actions;
const url = config.quotes;

export const loadQuotes = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: quotesRequested.type,
      onError: quotesRequestFail.type,
      onSuccess: quotesReceived.type,
      onServerFail: quoteServerFail.type,
    })
  );
};
export const loadQuote = (params) => (dispatch, getState) => {
  
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: quoteRequested.type,
      onError: quotesRequestFail.type,
      onSuccess: quoteReceived.type,
      onServerFail: quoteServerFail.type,
    })
  );
};
export const updateQuote = (parametres, quote) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: quotesRequested.type,
      onError: quotesRequestFail.type,
      onSuccess: quoteUpdated.type,
      onServerFail: quoteServerFail.type,
      url: url + parametres,
      method: "put",
      data: quote,
    })
  );
};
export const postQuote = (quote) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: quotesRequested.type,
      onError: quotesRequestFail.type,
      onSuccess: quoteUpdated.type,
      onServerFail: quoteServerFail.type,
      url: url,
      method: "post",
      data: quote,
    })
  );
};

export const deleteQuote = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: quotesRequested.type,
      onError: quotesRequestFail.type,
      onSuccess: quoteUpdated.type,
      onServerFail: quoteServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default quoteSlice.reducer;
