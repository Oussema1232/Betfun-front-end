import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
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

import Navbar from "../components/navbar/navbar";

class Betscreen extends Component {
  render() {
    return (
      <div className="betsScreenContainer">
        <BetdomainNavbar />
        <Switch>
          <Route
            exact
            path="/betfun/game/bets/:domainname/:id"
            component={BetsOfDomain}
          />
          <Route
            exact
            path="/betfun/game/bets/createbet/:username/:domainname/:seasonname/:gameweekname/:userId/:gameweekId"
            component={Createbet}
          />
          <Route
            exact
            path="/betfun/game/fixtures/:domainname/:seasonname/:domainId/:seasonId"
            component={Fixture}
          />
          <Route
            exact
            path="/betfun/game/leagues/:domainname/:id"
            component={LeaguesList}
          />
          <Route
            exact
            path="/betfun/game/levels/:domainname/:id"
            component={Levels}
          />
          <Route
            exact
            path="/betfun/game/teams/:domainname/:id"
            component={Teams}
          />
          <Route
            exact
            path="/betfun/game/betguess/:domainname/:betId"
            component={Betdetails}
          />
          <Route
            exact
            path="/betfun/game/leaguedetail/:leaguename/:domainname/:leagueId/:seasonId"
            component={Leaguedetails}
          />
          <Route
            exact
            path="/betfun/game/calendar/:domainname/:seasonname/:domainId/:seasonId"
            component={Calendar}
          />
          <Route
            exact
            path="/betfun/game/titles/:domainname/:seasonname/:domainId/:seasonId"
            component={Titles}
          />
          <Route
            exact
            path="/betfun/game/stats/:domainname/:domainId/:username/:userId"
            component={Stats}
          />
          
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // currentuser: state.betfundata.currentuser.data,
  // countries: state.betfundata.countries.list,
  users: state.betfundata.users.list,
});

export default connect(mapStateToProps, null)(Betscreen);
