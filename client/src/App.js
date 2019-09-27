import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import FundraisingCreate from './pages/fundraising/FundraisingCreate';
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signin/Signup";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/fundraiser/create" component={FundraisingCreate} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
