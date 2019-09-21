import React, { Component } from "react";
import "./Signin.scss";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class Signin extends Component {
  constructor() {
    super();

    this.state = {
      login: {
        email: "",
        password: ""
      },
      passLength: 0,
      snackbarOpen: false,
      snackbarMsg: ""
    };
  }

  //handles the snackbar warning message
  snackbarClose = event => {
    this.setState({
      snackbarOpen: false
    });
  };

  //handle updating the state with the values of the input fields
  updateText = event => {
    let updatedText = Object.assign({}, this.state.login);
    updatedText[event.target.id] = event.target.value;

    let updatedLength;
    event.target.id === "password"
      ? (updatedLength = event.target.value.length)
      : (updatedLength = 0);

    this.setState({
      login: updatedText,
      passLength: updatedLength
    });
  };

  //handles form submittal
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.passLength < 6) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Password must contain atleast 6 characters"
      });
    }
    if (!this.state.login.email) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Please enter a valid Email and Password"
      });
    }
    //Post request and response to be handled here once backend is setup
  };

  render() {
    return (
      <div className="pageView">
        <div className="loginView">
          <form onSubmit={this.handleSubmit}>
            <h2>Log In</h2>
            <span>Email</span>
            <br />
            <TextField
              id="email"
              type="email"
              placeholder="abc@hello.com"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={this.updateText}
            />
            <br />
            <span>Password</span>
            <br />
            <TextField
              id="password"
              type="password"
              placeholder="Minimum 6 characters"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              onChange={this.updateText}
            />
            <br />
            <span>Forgot Password?</span>
            <br />
            <button className="button" type="submit">
              Login
            </button>

            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              open={this.state.snackbarOpen}
              autoHideDuration={6000}
              onClose={this.snackbarClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={<span id="message-id">{this.state.snackbarMsg}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  onClick={this.snackbarClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </form>
        </div>

        <div className="signupView">
          <Link to="/signup">
            <button className="signupbutton" type="submit">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Signin;
