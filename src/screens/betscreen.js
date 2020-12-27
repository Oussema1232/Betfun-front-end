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
import Titles from "../components/gamepart/titles";
import Createbet from "../components/gamepart/createbet";

class Betscreen extends Component {
  render() {
    return (
      <div className="betsScreenContainer">
        <BetdomainNavbar />
        <Switch>
          <Route
            exact
            path="/game/bets/:domainname/:id"
            component={BetsOfDomain}
          />
          <Route
            exact
            path="/game/bets/createbet/:username/:domainname/:seasonname/:gameweekname/:userId/:gameweekId"
            component={Createbet}
          />
          <Route
            exact
            path="/game/fixtures/:domainname/:seasonname/:domainId/:seasonId"
            component={Fixture}
          />
          <Route
            exact
            path="/game/leagues/:domainname/:id"
            component={LeaguesList}
          />
          <Route
            exact
            path="/game/betguess/:domainname/:betId"
            component={Betdetails}
          />
          <Route
            exact
            path="/game/leaguedetail/:leaguename/:domainname/:leagueId/:seasonId"
            component={Leaguedetails}
          />
          <Route
            exact
            path="/game/calendar/:domainname/:seasonname/:domainId/:seasonId"
            component={Calendar}
          />
          <Route
            exact
            path="/game/titles/:domainname/:seasonname/:domainId/:seasonId"
            component={Titles}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentuser: state.betfundata.currentuser.data,
  countries: state.betfundata.countries.list,
  users: state.betfundata.users.list,
});

export default connect(mapStateToProps, null)(Betscreen);
