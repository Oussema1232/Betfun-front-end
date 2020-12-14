// import { combineReducers } from "redux";
// import betfundataReducer from "./betfundata";
// import { connectRouter } from "connected-react-router";

// import { persistReducer, createMigrate } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// const createRootReducer = (history) =>
//   combineReducers({
//     router: connectRouter(history),
//     betfundata: betfundataReducer,
//   });

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistedReducer = (history) =>
//   persistReducer(persistConfig, createRootReducer(history));

// export default persistedReducer;

import { combineReducers } from "redux";
import betfundataReducer from "./betfundata";
import { connectRouter } from "connected-react-router";

import { persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";
const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    betfundata: betfundataReducer,
  });

export default createRootReducer;
