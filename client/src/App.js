import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import Signup from "./pages/signin/Signup";
import Signin from "./pages/signin/Signin";
import NavBar from "./components/NavBar";
import FundraiserCreate from './pages/fundraisers/FundraiserCreate';

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import FundraiserList from "./pages/fundraisers/FundraisersList";

function App() {
  const [user, SetUser] = useState({});

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Signin} SetUser={SetUser} />
          <Route path="/signup" component={Signup} />
          <Route path = "/fundraiser*">
            <ProtectedRoute component = { NavBar } />
            <ProtectedRoute exact path="/fundraisers" component={FundraiserList} user={user} />
            <ProtectedRoute exact path="/fundraiser/create" component={FundraiserCreate} />
          </Route>
          <Route path="/" component={Signin}/> {/* fallback to signin or maybe 404 in the future */}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
