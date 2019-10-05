import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import Signup from "./pages/signin/Signup";
import Signin from "./pages/signin/Signin";
import NavBar from "./components/NavBar";
import FundraisingCreate from './pages/fundraising/FundraisingCreate';

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path = "/fundraiser/">
            <ProtectedRoute component = { NavBar } />
            <ProtectedRoute exact path="/fundraiser/create" component={FundraisingCreate} />
          </Route>
          <Route path="/" component={Signin}/> {/* fallback to signin */}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
