import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { persistStore } from "redux-persist";
import { connectRouter, routerMiddleware } from "connected-react-router";
import history from "./history";
import rootReducer from "../features/reducers/rootreducer";
import api from "../app/middleware/api";

const store = configureStore({
  reducer: rootReducer(history),
  middleware: [...getDefaultMiddleware(), routerMiddleware(history), api],
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("../features/reducers/rootreducer", () => {
    const newRootReducer = require("../features/reducers/rootreducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;

// import {
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// const store = configureStore({
//   reducer: rootReducer(history),
//   middleware: [
//     ...getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//     routerMiddleware(history),
//     api,
//   ],
// });
// const persistor = persistStore(store);

// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("../features/reducers/rootreducer", () => {
//     const newRootReducer = require("../features/reducers/rootreducer").default;
//     store.replaceReducer(newRootReducer);
//   });
// }

// export default { store, persistor };
