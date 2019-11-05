import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";
import Signup from "./pages/signin/Signup";
import Signin from "./pages/signin/Signin";
import NavBar from "./components/NavBar";
import ChatBar from "./components/ChatBar";
import FundraiserCreate from "./pages/fundraisers/FundraiserCreate";
import FundraiserDetails from "./pages/fundraisers/FundraiserDetails";
import FundraiserUpdate from "./pages/fundraisers/FundraiserUpdate";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import FundraiserList from "./pages/fundraisers/FundraisersList";
import LogOut from "./components/LogOut";
import NotFoundPage from "./pages/NotFoundPage";

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

          <ProtectedRoute path="/message/:id">
            <Route component={ChatBar} />
          </ProtectedRoute>

          <ProtectedRoute path="/fundraiser*">
            <Route component={NavBar} />
            <Route exact path="/fundraisers" component={FundraiserList} />
            <Route
              exact
              path="/fundraiser/create"
              component={FundraiserCreate}
            />
            <Route
              path="/fundraiser/details/:id"
              component={FundraiserDetails}
            />
            <Route path="/fundraiser/:id/edit" component={FundraiserUpdate} />
          </ProtectedRoute>
          <ProtectedRoute path="/logout">
            <Route component={LogOut} />
          </ProtectedRoute>
          <ProtectedRoute path="/logout" component={LogOut} />
          <Route
            exact
            path="/"
            render={props => <Signin {...props} setUserState={SetUserState} />}
          >
            <Redirect from="/" to="/fundraisers" />>
          </Route>
          <Route path="/" component={NotFoundPage} />
          {/* fallback to signin or maybe 404 in the future */}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
