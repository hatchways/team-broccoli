import React from "react";
import { Route, Redirect } from "react-router-dom";

function LogOut() {
  localStorage.removeItem("access_token");
  return (
    <Route
      render={props => (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
        />
      )}
    />
  );
}

export default LogOut;
