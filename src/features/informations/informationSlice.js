import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import config from "../../config.json";

export const informationSlice = createSlice({
  name: "informations",
  initialState: {
    list: [],
    oneInfo: {},
    loading: false,
    errors: {},
    onsuccess: {},
  },
  reducers: {
    informationsRequested: (state, action) => {
      state.loading = true;
      state.list = [];
      state.onsuccess = {};
      state.errors = {};
    },
    informationRequested: (state, action) => {
      state.loading = true;
      state.oneInfo = {};
      state.onsuccess = {};
      state.errors = {};
    },
    informationsRequestFail: (state, action) => {
      state.loading = false;
      state.errors.message = action.payload.message;
    },
    informationsReceived: (state, action) => {
      state.list = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    informationReceived: (state, action) => {
      state.oneInfo = action.payload.data;
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    informationUpdated: (state, action) => {
      state.loading = false;
      state.onsuccess.message = action.payload.message;
    },
    informationServerFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  informationsReceived,
  informationsRequested,
  informationReceived,
  informationRequested,
  informationUpdated,
  informationsRequestFail,
  informationServerFail,
} = informationSlice.actions;
const url = config.informations;

export const loadInformations = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: informationsRequested.type,
      onError: informationsRequestFail.type,
      onSuccess: informationsReceived.type,
      onServerFail: informationServerFail.type,
    })
  );
};
export const loadInformation = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      url: url + params,
      onStart: informationRequested.type,
      onError: informationsRequestFail.type,
      onSuccess: informationReceived.type,
      onServerFail: informationServerFail.type,
    })
  );
};
export const updateInformation = (parametres, information) => (
  dispatch,
  getState
) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: informationsRequested.type,
      onError: informationsRequestFail.type,
      onSuccess: informationUpdated.type,
      onServerFail: informationServerFail.type,
      url: url + parametres,
      method: "put",
      data: information,
    })
  );
};
export const postInformation = (information) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: informationsRequested.type,
      onError: informationsRequestFail.type,
      onSuccess: informationUpdated.type,
      onServerFail: informationServerFail.type,
      url: url,
      method: "post",
      data: information,
    })
  );
};

export const deleteInformation = (params) => (dispatch, getState) => {
  return dispatch(
    actions.apiCallBegan({
      onStart: informationsRequested.type,
      onError: informationsRequestFail.type,
      onSuccess: informationUpdated.type,
      onServerFail: informationServerFail.type,
      url: url + params,
      method: "delete",
    })
  );
};

export default informationSlice.reducer;
