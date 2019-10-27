import React, { Component } from "react";
import { Link } from "react-router-dom";

import Background from "./backgroundimage.jpg";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Api from "../../util/Api";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      signup: {
        name: "",
        email: "",
        password: "",
        termsNconditions: ""
      },
      passLength: 0,
      snackbarOpen: false,
      snackbarMsg: "",
      terms: false
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
    let updatedText = Object.assign({}, this.state.signup);
    updatedText[event.target.id] = event.target.value;

    let updatedLength;
    event.target.id === "password"
      ? (updatedLength = event.target.value.length)
      : (updatedLength = 0);

    this.setState({
      signup: updatedText,
      passLength: updatedLength
    });
  };

  async attempt_signup(details) {
    let api = new Api("create");
    const result = await api.post(details);
    //TODO: if response is not 200, display error

    if (result.success) this.props.history.push("/signin");
  }

  //handles form submittal
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.passLength < 6) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Password must contain atleast 6 characters"
      });
    }
    if (!this.state.signup.email) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Please enter a valid Email"
      });
    }
    if (!this.state.signup.name) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Please enter a name"
      });
    }
    if (!this.state.terms) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg:
          "Please agree to the terms and conditions by selecting the checkbox"
      });
    }

    this.attempt_signup({
      name: this.state.signup.name,
      email: this.state.signup.email,
      password: this.state.signup.password
    });
  };

  handleCheck = event => {
    let updatedConditions = event.target.value;
    let updatedTerms = this.state.terms;
    !updatedTerms ? (updatedTerms = true) : (updatedTerms = false);

    this.setState(prevState => ({
      terms: updatedTerms,
      signup: {
        ...prevState.signup,
        termsNconditions: updatedConditions
      }
    }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.pageView}>
        <div className={classes.createView}>
          <form onSubmit={this.handleSubmit}>
            <h2>Create an account</h2>
            <span>Name</span>
            <br />
            <TextField
              id="name"
              type="name"
              onChange={this.updateText}
              margin="normal"
              variant="outlined"
            />
            <br />
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.terms}
                  onChange={this.handleCheck}
                  value="Agree"
                  color="primary"
                />
              }
              label="By signing up I agree with terms and conditions"
            />
            <br />
            <button className={classes.create} type="submit">
              Create
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

        <div className={classes.returnView}>
          <Link to="/signin">
            <button className={classes.signin} type="submit">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  create: theme.solidButton,
  signin: theme.opaqueButton,
  pageView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  createView: {
    flex: 1,
    flexWrap: "wrap",
    boxSizing: "border-box",
    padding: "90px"
  },
  returnView: {
    flex: 1,
    flexWrap: "wrap",
    boxSizing: "border-box",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    height: "100vh"
  }
});

export default withStyles(styles)(Signup);
