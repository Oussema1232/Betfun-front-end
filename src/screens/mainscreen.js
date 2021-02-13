import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import background from "../../src/sky.jpg";
import Betfunalllogo from "../commun/logos/betfunalllogo";

import "./style.css";
import Navbar from "../components/navbar/navbar";
import BetdomainNavbar from "../components/navbar/betdomainNavbar";
import Knowledge from "./knowledgescreen";
import BetsScreen from "./betscreen";
import WelcomeScreen from "./welcomeScreen";
import Categoriesknowledge from "../components/questionsparts/categoriesbackdrop";

class Mainscreen extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            width: "100%",
          }}
        >
          <Switch>
            <Route path="/betfun/welcome" component={WelcomeScreen} />
            <Route path="/betfun/game" component={BetsScreen} />
          </Switch>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentuser: state.betfundata.currentuser.data,
  countries: state.betfundata.countries.list,
  users: state.betfundata.users.list,
});

export default connect(mapStateToProps, null)(Mainscreen);
