import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    list: [],
    loading: "false",
    errors: {},
    onsuccess: {},
  },
  reducers: {
    countriesRequested: (state, action) => {
      state.loading = true;
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
  },
});

const {
  countriesReceived,
  countriesRequested,
  countriesRequestFail,
} = countrySlice.actions;
const url = config.countries;

export const loadCountries = () => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url,
      onStart: countriesRequested.type,
      onError: countriesRequestFail.type,
      onSuccess: countriesReceived.type,
    })
  );
};

export const selectCountryById = (userId) =>
  createSelector(
    (state) => state.betfundata.countries.list,
    (users) => users.filter((user) => user.id === userId)
  );

export default countrySlice.reducer;
