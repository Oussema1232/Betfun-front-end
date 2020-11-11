import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Betfunlogo from "./commun/logos/betfunalllogo";
import Login from "./components/logcomponents/loginForm";
import Register from "./components/logcomponents/registerForm";
import Confirmation from "./components/logcomponents/registerconfirmation";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <>
      <ToastContainer />

      <Switch>
        <Route
          path="/register/confirmation"
          render={(props) => <Confirmation {...props} />}
        />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Redirect from="/" exact to="/login" />
      </Switch>
    </>
  );
}

export default App;

//withrouter
