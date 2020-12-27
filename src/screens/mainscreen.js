import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import background from "../../src/sky.jpg";
import Betfunalllogo from "../commun/logos/betfunalllogo";

import "./style.css";
import Navbar from "../components/navbar/navbar";
import BetdomainNavbar from "../components/navbar/betdomainNavbar";
import Welcome from "./welcome";
import BetsScreen from "./betscreen";

class Mainscreen extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/game" component={BetsScreen} />
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

export default connect(mapStateToProps, null)(Mainscreen);
