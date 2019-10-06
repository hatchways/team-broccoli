import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import Signup from "./pages/signin/Signup";
import Signin from "./pages/signin/Signin";
import NavBar from "./components/NavBar";
import FundraiserCreate from "./pages/fundraisers/FundraiserCreate";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import FundraiserList from "./pages/fundraisers/FundraisersList";
import LogOut from "./components/LogOut";

function App() {
  const [user, setUser] = useState({});

  function SetUserState(user) {
    setUser(user);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/signin"
            render={props => <Signin {...props} setUserState={SetUserState} />}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/fundraiser*">
            <ProtectedRoute component={NavBar} />
            <ProtectedRoute
              exact
              path="/fundraisers"
              component={FundraiserList}
            />
            <ProtectedRoute
              exact
              path="/fundraiser/create"
              component={FundraiserCreate}
            />
          </Route>
          <ProtectedRoute path="/logout" component={LogOut} />
          <Route
            path="/"
            render={props => <Signin {...props} setUserState={SetUserState} />}
          />{" "}
          {/* fallback to signin or maybe 404 in the future */}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
