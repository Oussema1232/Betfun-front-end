import { combineReducers } from "redux";
import userReducer from "../users/userSlice";
import currentuserReducer from "../currentuser/currentuserSlice";
import currentdomainReducer from "../currentdomain/currentdomainSlice";
import currentcommunityReducer from "../currentcommunity/currentcommunitySlice";
import countryReducer from "../countries/countrySlice";
import domainReducer from "../domains/domainSlice";
import userdomainReducer from "../userdomains/userdomainSlice";
import communityReducer from "../communities/communitySlice";
import leaguegenreReducer from "../leaguesgenres/leaguegenreSlice";
import leagueReducer from "../leagues/leagueSlice.js";
import betReducer from "../bets/betSlice.js";
import betdetailReducer from "../betdetails/betdetailSlice.js";
import leaguedetailReducer from "../leaguedetails/leaguedetailSlice.js";
import seasonReducer from "../seasons/seasonSlice.js";
import matcheReducer from "../matches/matcheSlice.js";
import gameweekReducer from "../gameweeks/gameweekSlice.js";
import titleReducer from "../titles/titleSlice.js";

export default combineReducers({
  users: userReducer,
  currentuser: currentuserReducer,
  currentdomain: currentdomainReducer,
  currentcommunity: currentcommunityReducer,
  countries: countryReducer,
  domains: domainReducer,
  userdomains: userdomainReducer,
  communities: communityReducer,
  leaguesgenres: leaguegenreReducer,
  leagues: leagueReducer,
  leaguedetails: leaguedetailReducer,
  bets: betReducer,
  betdetails: betdetailReducer,
  seasons: seasonReducer,
  matches: matcheReducer,
  gameweeks: gameweekReducer,
  titles: titleReducer,
});
