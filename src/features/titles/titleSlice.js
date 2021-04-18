import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import * as actions from "../actions/api";
import config from "../../config.json";

export const titleSlice = createSlice({
  name: "titles",
  initialState: {
    list: [],
    countriesInvolvedLastSeason: [],
    sultan: {},
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    titlesRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.countriesInvolvedLastSeason = [];
      state.list = [];
      state.sultan = {};
      state.errors = {};
    },
    titlesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load titles";
    },
    titlesReceived: (state, action) => {
      state.list = _.drop(action.payload.data);
      if (action.payload.data.length >= 1) {
        state.sultan = action.payload.data[0];
        for (let i = 0; i < state.list.length; i++) {
          state.countriesInvolvedLastSeason.push({
            id: state.list[i].countryId,
            name: state.list[i].countryname,
          });
        }
      }

      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    titleServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  titlesReceived,
  titlesRequested,
  titlesRequestFail,
  titleServerFail,
} = titleSlice.actions;
const url = config.titles;

export const loadTitles = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: titlesRequested.type,
      onError: titlesRequestFail.type,
      onSuccess: titlesReceived.type,
      onServerFail: titleServerFail.type,
    })
  );
};

export default titleSlice.reducer;
