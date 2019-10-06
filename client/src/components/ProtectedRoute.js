import React, { Component, useState } from 'react';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  if (localStorage.getItem("access_token") === null) {
    return (
      <Route
        {...rest}
        render = { 
          props => <Redirect to={{ pathname: "/signin", state: { from: props.location } }} /> 
        }
      />
    );
  }

  return ( <Route {...rest} render={props => <Component {...props}/> } /> );
}

export default ProtectedRoute