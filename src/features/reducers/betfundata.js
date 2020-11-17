import { combineReducers } from "redux";
import userReducer from "../users/userSlice";
import currentuserReducer from "../currentuser/currentuserSlice";

import countryRducer from "../countries/countrySlice";

export default combineReducers({
  users: userReducer,
  currentuser: currentuserReducer,
  countries: countryRducer,
});
