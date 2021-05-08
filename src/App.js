import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/logcomponents/loginForm";
import Logout from "./components/logcomponents/logout";
import Register from "./components/logcomponents/registerForm";
import Confirmation from "./components/logcomponents/registerconfirmation";
import ProtectedRoute from "./commun/protectedRoute";
import Mainscreen from "./screens/mainscreen";
import Notfound from "./screens/notfound";
import KnowledgeScreen from "./screens/knowledgescreen";
import Resetpassword from "./components/logcomponents/resetpassword";
import Checkemail from "./components/logcomponents/checkemailreset";
import LogRoute from "./commun/logroute";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <>
      <ToastContainer style={{ zIndex: 10001 }} />
      <Switch>
        {/* <LogRoute path="/account/resetpassword" component={Resetpassword} />
        <LogRoute path="/account/checkemail" component={Checkemail} />
        <LogRoute path="/register/confirmation" component={Confirmation} />
        <LogRoute path="/register" exact component={Register} />
        <LogRoute path="/login" exact component={Login} />
        <ProtectedRoute path="/logout" exact component={Logout} /> */}
        <Route path="/game" component={Mainscreen} />
        <Route path="/knowledge" component={KnowledgeScreen} />
        <Route path="/not-Found" component={Notfound} />
        <Redirect exact from="/" to="/game" component={Mainscreen} />
        <Redirect to="/not-Found" component={Notfound} />
      </Switch>
    </>
  );
}

export default App;
