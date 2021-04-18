import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const AdminRoute = ({ component: Component, render, ...rest }) => {
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser()) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        } else if (currentuser.isAdmin != 1) {
          return (
            <Redirect
              to={{
                pathname: "/not-found",
              }}
            />
          );
        } else return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminRoute;
