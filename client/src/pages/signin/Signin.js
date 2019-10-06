import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Background from "./backgroundimage.jpg";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class Signin extends Component {
  constructor(props) {
    super(props);

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
    //TODO: cleanup/extract api functionality
    let url = process.env.REACT_APP_SERVER_URL;

    let requestBody = {
      email: this.state.login.email,
      password: this.state.login.password,
    }

    let fetchData = {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: new Headers(),
      credentials: 'same-origin'
    }

    fetch(url + '/signin', fetchData)
      .then(res => {
        if (res !== 200) {
          ; // TODO: handle :( cases
        } return res;
      })
      .then(res => res.json())
      .then(authenticated_user => {
        localStorage.setItem("access_token", authenticated_user.access_token);
        //this.props.SetUser(authenticated_user);
        this.props.history.push("/fundraisers");
        //TODO: redirect to home page
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.pageView}>
        <div className={classes.loginView}>
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
            <button className={classes.login} type="submit">
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

        <div className={classes.signupView}>
          <Link to="/signup">
            <button className={classes.signup} type="submit">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  login: theme.solidButton,
  signup: theme.opaqueButton,
  pageView: {
    display: "flex",
    flexDirection: "row",
    maxwidth: "100%",
    justifyContent: "space-between"
  },
  loginView: {
    flex: 1,
    flexWrap: "wrap",
    flexBasis: "50%",
    boxSizing: "border-box",
    padding: "100px",
    marginBottom: "115px"
  },
  signupView: {
    flex: 1,
    flexWrap: "wrap",
    flexBasis: "50%",
    boxSizing: "border-box",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover"
  }
});

export default withStyles(styles)(withRouter(Signin));
