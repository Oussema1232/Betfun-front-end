import { combineReducers } from "redux";
import betfundataReducer from "./betfundata";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    betfundata: betfundataReducer,
  });

export default createRootReducer;
