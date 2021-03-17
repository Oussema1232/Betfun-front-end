import React, { useState } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import background from "../../src/sky.jpg";
import Betfunalllogo from "../commun/logos/betfunalllogo";

import "./style.css";
import Navbar from "../components/navbar/navbar";
import Admin from "../components/gamepart/admin/admin";
import BetdomainNavbar from "../components/navbar/betdomainNavbar";
import Knowledge from "./knowledgescreen";
import BetsScreen from "./betscreen";
import WelcomeScreen from "./welcomeScreen";

import Categoriesknowledge from "../components/questionsparts/categoriesbackdrop";

const Mainscreen = () => {
  const [showbubble, setShowbubble] = useState();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          width: "100%",
        }}
      >
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            width: "100%",
          }}
        >
          <Switch>
            <Route
              path="/betfun/welcome"
              render={(props) => <WelcomeScreen {...props} />}
            />
            <Route exact path="/betfun/admin" component={Admin} />
            <Route path="/betfun/game" component={BetsScreen} />
            <Redirect from="/betfun" to="/betfun/welcome" />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Mainscreen;

// const mapStateToProps = (state) => ({
//   currentuser: state.betfundata.currentuser.data,
//   countries: state.betfundata.countries.list,
//   users: state.betfundata.users.list,
// });

// export default connect(mapStateToProps, null)(Mainscreen);
