import { combineReducers } from "redux";
import userReducer from "../users/userSlice";
import currentuserReducer from "../currentuser/currentuserSlice";
import currentprofileReducer from "../currentprofile/currentprofileSlice";
import currentdomainReducer from "../currentdomain/currentdomainSlice";
import currentcategoryReducer from "../currentcategory/currentcategorySlice";
import countryReducer from "../countries/countrySlice";
import domainReducer from "../domains/domainSlice";
import userdomainReducer from "../userdomains/userdomainSlice";
import profiledomainReducer from "../profiledomains/profiledomainSlice";
import leaguegenreReducer from "../leaguesgenres/leaguegenreSlice";
import leagueReducer from "../leagues/leagueSlice.js";
import betReducer from "../bets/betSlice.js";
import betdetailReducer from "../betdetails/betdetailSlice.js";
import leaguedetailReducer from "../leaguedetails/leaguedetailSlice.js";
import seasonReducer from "../seasons/seasonSlice.js";
import teamReducer from "../teams/teamSlice.js";
import matcheReducer from "../matches/matcheSlice.js";
import gameweekReducer from "../gameweeks/gameweekSlice.js";
import titleReducer from "../titles/titleSlice.js";
import levelReducer from "../levels/levelSlice.js";
import quoteReducer from "../quotes/quoteSlice.js";
import informationReducer from "../informations/informationSlice.js";
import categoryReducer from "../categories/categorySlice.js";
import difficultyReducer from "../difficulties/difficultySlice.js";
import questionReducer from "../questions/questionSlice.js";
import roundReducer from "../round/roundSlice.js";
import suggestionReducer from "../suggestions/suggestionSlice.js";
import domainstatsReducer from "../domainstats/domainstatsSlice.js";
import knowledgestatsReducer from "../knowledgestats/knowledgestatsSlice.js";

export default combineReducers({
  users: userReducer,
  currentuser: currentuserReducer,
  currentprofile: currentprofileReducer,
  currentdomain: currentdomainReducer,
  currentcategory: currentcategoryReducer,
  countries: countryReducer,
  domains: domainReducer,
  userdomains: userdomainReducer,
  profiledomains: profiledomainReducer,
  leaguesgenres: leaguegenreReducer,
  leagues: leagueReducer,
  leaguedetails: leaguedetailReducer,
  bets: betReducer,
  levels: levelReducer,
  betdetails: betdetailReducer,
  seasons: seasonReducer,
  teams: teamReducer,
  matches: matcheReducer,
  gameweeks: gameweekReducer,
  titles: titleReducer,
  quotes: quoteReducer,
  informations: informationReducer,
  categories: categoryReducer,
  difficulties: difficultyReducer,
  questions: questionReducer,
  round: roundReducer,
  suggestions: suggestionReducer,
  domainstats: domainstatsReducer,
  knowledgestats: knowledgestatsReducer,
});
