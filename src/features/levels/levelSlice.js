import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../actions/api";
import config from "../../config.json";

export const levelSlice = createSlice({
  name: "levels",
  initialState: {
    list: [],
    listbydomainadmin: [],
    souslist: [],
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    levelsRequested: (state, action) => {
      state.loading = true;
      state.onsuccess = {};
      state.errors = {};
    },
    levelsbydomainadminRequested: (state, action) => {
      state.listbydomainadmin = [];
      state.error = {};
      state.loading = true;
      state.onsuccess = {};

      state.errors = {};
    },
    levelsbydomainadminReceived: (state, action) => {
      state.listbydomainadmin = action.payload.data;
      let domainName = action.payload.domainname;
      state.loading = false;
      state.onsuccess.message = action.payload.message;

      for (let i = 0; i < state.listbydomainadmin.length; i++) {
        state.souslist[i] = {
          id: state.listbydomainadmin[i].id,
          [`${domainName}startpoints`]: state.listbydomainadmin[i][
            `${domainName}startpoints`
          ],
          [`${domainName}endpoints`]: state.listbydomainadmin[i][
            `${domainName}endpoints`
          ],
        };
      }
    },
    sousListLevelLimitsUpdated: (state, action) => {
      for (let i = 0; i < state.souslist.length; i++) {
        if (state.souslist[i].id == action.payload.id) {
          state.souslist[i][action.payload.targetpoints] =
            action.payload[action.payload.targetpoints];
        }
      }
    },
    levelsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    levelsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    levelUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    levelServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  levelsReceived,
  levelsRequested,
  levelsbydomainadminRequested,
  levelsbydomainadminReceived,
  sousListLevelLimitsUpdated,
  levelUpdated,
  levelsRequestFail,
  levelServerFail,
} = levelSlice.actions;
const url = config.levels;

export const loadLevels = (parametres) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + parametres,
      onStart: levelsRequested.type,
      onError: levelsRequestFail.type,
      onSuccess: levelsReceived.type,
      onServerFail: levelServerFail.type,
    })
  );
};

export const loadLevelbydomainadmin = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: levelsbydomainadminRequested.type,
      onError: levelsRequestFail.type,
      onSuccess: levelsbydomainadminReceived.type,
      onServerFail: levelServerFail.type,
    })
  );
};

export const updateLevel = (parametres, level) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: levelsRequested.type,
      onError: levelsRequestFail.type,
      onSuccess: levelUpdated.type,
      onServerFail: levelServerFail.type,
      url: url + parametres,
      method: "put",
      data: level,
    })
  );
};
export const postLevel = (level) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: levelsRequested.type,
      onError: levelsRequestFail.type,
      onSuccess: levelUpdated.type,
      onServerFail: levelServerFail.type,
      url: url,
      method: "post",
      data: level,
    })
  );
};

export const editlevelslimits = (domainId, limits) =>
  actions.apiCallBegan({
    url: `${url}/${domainId}`,
    onStart: levelsRequested.type,
    onError: levelsRequestFail.type,
    onSuccess: levelUpdated.type,
    onServerFail: levelServerFail.type,
    method: "put",
    data: { levels: limits },
  });

export const deleteLevel = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: levelsRequested.type,
      onError: levelsRequestFail.type,
      onSuccess: levelUpdated.type,
      onServerFail: levelServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default levelSlice.reducer;
