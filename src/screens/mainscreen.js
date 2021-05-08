import React from "react";

import { Redirect, Switch } from "react-router-dom";

import ProtectedRoute from "../commun/protectedRoute";
import Navbar from "../components/navbar/navbar";
import Admin from "../components/gamepart/admin/admin";
import Params from "../components/gamepart/params";

import BetsScreen from "./betscreen";
import WelcomeScreen from "./welcomeScreen";

import "./style.css";

const Mainscreen = () => {
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
            <ProtectedRoute
              path="/game/welcome"
              render={(props) => <WelcomeScreen {...props} />}
            />
            <ProtectedRoute path="/game/bet" component={BetsScreen} />
            <ProtectedRoute path="/game/params" component={Params} />

            <ProtectedRoute exact path="/game/admin" component={Admin} />
            <Redirect from="/" to="/game/welcome" />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Mainscreen;
