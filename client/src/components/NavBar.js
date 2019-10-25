import { NavLink, Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import FundraiserCreate from "../pages/fundraisers/FundraiserCreate";

import { ReactComponent as Logo } from "../res/images/smile.svg";

const useStyles = makeStyles(theme => ({
  glue: {
    flexGrow: 1
  },
  avatarRightMargin: {
    // 8px is the internal horizontal padding the buttons use.
    // This is a margin because making it padding distorts the Avatar
    //  circle into an oval.
    "margin-right": "8px"
  },
  buttonRoot: {
    // For circular ends, an outlined button should have a border-radius
    // of half the smaller dimension.

    // An outlined button's height is 35.8333 px; an unoutlined button's
    // height is 36.5 px.

    // The "My Profile" button is taller because of the avatar --
    // this 18px radius does not produce circular ends for it.
    "border-radius": "18px",
    "text-transform": "none",
    "margin-left": "0.5em"
  }
}));

function NavBar({ props }) {
  const classes = useStyles();

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Logo width="40px" height="40px" />
        <div className={classes.glue} />
        <NavLink to="/fundraiser/message">
          <Button className={classes.buttonRoot}>Message</Button>
        </NavLink>
        <NavLink to="/fundraisers">
          <Button className={classes.buttonRoot}>Browse Fundraisers</Button>
        </NavLink>
        <NavLink to="/fundraiser/create">
          <Button variant="outlined" className={classes.buttonRoot}>
            CREATE NEW CAUSE
          </Button>
        </NavLink>
        <NavLink to="/profile">
          <Button className={classes.buttonRoot}>
            <Avatar className={classes.avatarRightMargin}></Avatar>
            My profile
          </Button>
        </NavLink>
        <NavLink to="/logout">
          <Button className={classes.buttonRoot}>Log out</Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
