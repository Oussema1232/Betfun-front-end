import { combineReducers } from "redux";
import betfundataReducer from "./betfundata";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    betfundata: betfundataReducer,
  });

const persistConfig = {
  key: 'key',
  storage 
}

const persistedReducer = (history) =>
  persistReducer(persistConfig, createRootReducer(history));

export default persistedReducer;


