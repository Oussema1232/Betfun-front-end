import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    countriesRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    countriesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load countries";
    },
    countriesReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    countryUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    countryServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  countriesReceived,
  countriesRequested,
  countryUpdated,
  countriesRequestFail,
  countryServerFail,
} = countrySlice.actions;
const url = config.countries;

export const loadCountries = () => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url,
      onStart: countriesRequested.type,
      onError: countriesRequestFail.type,
      onSuccess: countriesReceived.type,
      onServerFail: countryServerFail.type,
    })
  );
};

export const updateCountry = (parametres, country) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: countriesRequested.type,
      onError: countriesRequestFail.type,
      onSuccess: countryUpdated.type,
      onServerFail: countryServerFail.type,
      url: url + parametres,
      method: "put",
      data: country,
    })
  );
};
export const postCountry = (country) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: countriesRequested.type,
      onError: countriesRequestFail.type,
      onSuccess: countryUpdated.type,
      onServerFail: countryServerFail.type,
      url: url,
      method: "post",
      data: country,
    })
  );
};

export const deleteCountry = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: countriesRequested.type,
      onError: countriesRequestFail.type,
      onSuccess: countryUpdated.type,
      onServerFail: countryServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export const selectCountryById = (userId) =>
  createSelector(
    (state) => state.betfundata.countries.list,
    (users) => users.filter((user) => user.id === userId)
  );

export default countrySlice.reducer;
