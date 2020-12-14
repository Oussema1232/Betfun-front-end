import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import BetdomainNavbar from "../components/navbar/betdomainNavbar";
import BetsOfDomain from "../components/gamepart/betsofdomain";
import LeaguesList from "../components/gamepart/leagueslist";
import Betdetails from "../components/gamepart/betdetailslist";
import Calendar from "../components/gamepart/calendar";

class Betscreen extends Component {
  render() {
    return (
      <div className="betsScreenContainer">
        <BetdomainNavbar />
        <Switch>
          <Route
            exact
            path="/yourgame/yourbets/:domainname/:id"
            component={BetsOfDomain}
          />
          <Route
            exact
            path="/yourgame/calendar/:domainname/:seasonname/:domainId/:seasonId"
            component={Calendar}
          />
          <Route
            exact
            path="/yourgame/yourleagues/:domainname/:id"
            component={LeaguesList}
          />
          <Route
            exact
            path="/yourgame/betguess/:domainname/:betId"
            component={Betdetails}
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
