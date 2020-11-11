import { combineReducers } from "redux";
import userReducer from "../users/userSlice";

import countryRducer from "../countries/countrySlice";

export default combineReducers({
  users: userReducer,
  countries: countryRducer,
});
