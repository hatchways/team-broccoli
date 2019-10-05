import { NavLink, Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Avatar } from "@material-ui/core";
import React from "react";
import FundraisingCreate from "../pages/fundraising/FundraisingCreate";

function NavBar({ props }) {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar align="right">
        <NavLink to="/message/create">
          <Button>
            Message
          </Button>
        </NavLink>
        <NavLink to="/fundraisers">
          <Button>
            Browse Fundraisers
          </Button>
        </NavLink>
        <NavLink to="/fundraiser/create">
          <Button variant="outlined">
            CREATE NEW CAUSE
          </Button>
        </NavLink>
        <NavLink to="/profile">
          <Button>
            <Avatar>
            </Avatar>
            My profile
          </Button>
        </NavLink>
      </Toolbar>

    </AppBar>
  );
}


export default NavBar;
