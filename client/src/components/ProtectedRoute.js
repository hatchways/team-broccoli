import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Api from "../util/Api";

function ProtectedRoute({ children, ...rest }) {
  const [is_authenticated, checkAuth] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function validateToken() {
      let api = new Api("validate_token");
      let valid = await api.get();

      if (!didCancel) {
        checkAuth(valid.success);
      }
    }

    validateToken();

    return function() {
      didCancel = true;
    };
  }, []);

  if (is_authenticated === null) {
    return "Loading...";
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        is_authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
