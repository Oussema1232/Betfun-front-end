import React, { Component } from "react";
import {  Switch } from "react-router-dom";
import BetdomainNavbar from "../components/navbar/betdomainNavbar";
import BetsOfDomain from "../components/gamepart/betsofdomain";
import LeaguesList from "../components/gamepart/leagueslist";
import Betdetails from "../components/gamepart/betdetailslist";
import Leaguedetails from "../components/gamepart/leaguedetails";
import Calendar from "../components/gamepart/calendar2";
import Fixture from "../components/gamepart/fixtures";
import Levels from "../components/gamepart/levels";
import Teams from "../components/gamepart/teams";
import Titles from "../components/gamepart/titles";
import Stats from "../components/gamepart/stats";
import Createbet from "../components/gamepart/createbet";
import ProtectedRoute from "../commun/protectedRoute";



class Betscreen extends Component {
  render() {
    return (
      <div className="betsScreenContainer">
        <BetdomainNavbar />
        <Switch>
          <ProtectedRoute
            exact
            path="/game/bet/bets/:domainname/:id"
            component={BetsOfDomain}
          />
          <ProtectedRoute
            exact
            path="/game/bet/bets/createbet/:username/:domainname/:seasonname/:gameweekname/:userId/:gameweekId"
            component={Createbet}
          />
          <ProtectedRoute
            exact
            path="/game/bet/fixtures/:domainname/:seasonname/:domainId/:seasonId"
            component={Fixture}
          />
          <ProtectedRoute
            exact
            path="/game/bet/leagues/:domainname/:id"
            component={LeaguesList}
          />
          <ProtectedRoute
            exact
            path="/game/bet/levels/:domainname/:id"
            component={Levels}
          />
          <ProtectedRoute
            exact
            path="/game/bet/teams/:domainname/:id"
            component={Teams}
          />
          <ProtectedRoute
            exact
            path="/game/bet/betguess/:domainname/:betId"
            component={Betdetails}
          />
          <ProtectedRoute
            exact
            path="/game/bet/leaguedetail/:leaguename/:domainname/:leagueId/:seasonId"
            component={Leaguedetails}
          />
          <ProtectedRoute
            exact
            path="/game/bet/calendar/:domainname/:seasonname/:domainId/:seasonId"
            component={Calendar}
          />
          <ProtectedRoute
            exact
            path="/game/bet/titles/:domainname/:seasonname/:domainId/:seasonId"
            component={Titles}
          />
          <ProtectedRoute
            exact
            path="/game/bet/stats/:domainname/:domainId/:username/:userId"
            component={Stats}
          />
        </Switch>
      </div>
    );
  }
}


export default Betscreen;
