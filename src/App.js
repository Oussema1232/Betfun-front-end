import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/logcomponents/loginForm";
import Register from "./components/logcomponents/registerForm";
import Confirmation from "./components/logcomponents/registerconfirmation";
import ProtectedRoute from "./commun/protectedRoute";
import LogRoute from "./commun/logroute";
import Mainscreen from "./screens/mainscreen";
import Notfound from "./screens/notfound";

import Resetpassword from "./components/logcomponents/resetpassword";
import Checkemail from "./components/logcomponents/checkemailreset";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  useEffect(() => {
    const id = nanoid(6);
    console.log("this is the code", id);
  }, []);
  return (
    <>
      <ToastContainer style={{ zIndex: 10001 }} />
      {/* <Resetpassword /> */}
      <Switch>
        <LogRoute path="/account/resetpassword" component={Resetpassword} />
        <LogRoute path="/account/checkemail" component={Checkemail} />
        <LogRoute path="/register/confirmation" component={Confirmation} />
        <LogRoute path="/register" exact component={Register} />
        <LogRoute path="/login" exact component={Login} />
        <ProtectedRoute path="/Accueil" component={Mainscreen} />
        <Route path="/not-found" component={Notfound} />
        <Redirect from="/" exact to="/Accueil" />
        <Redirect to="/not-Found" component={Notfound} />
      </Switch>
    </>
  );
}

export default App;
