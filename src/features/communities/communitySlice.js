import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const communitySlice = createSlice({
  name: "communities",
  initialState: {
    list: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    communitiesRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    communitiesRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = "Couldn't load communities";
    },
    communitiesReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    communityServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  communitiesReceived,
  communitiesRequested,
  communitiesRequestFail,
  communityServerFail,
} = communitySlice.actions;
const url = config.communities;

export const loadCommunities = () => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url,
      onStart: communitiesRequested.type,
      onError: communitiesRequestFail.type,
      onSuccess: communitiesReceived.type,
      onServerFail: communityServerFail.type,
    })
  );
};

export const selectCountryById = (userId) =>
  createSelector(
    (state) => state.betfundata.communities.list,
    (users) => users.filter((user) => user.id === userId)
  );

export default communitySlice.reducer;
