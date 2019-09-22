import React, { Component } from "react";

import { theme } from '../../themes/theme'
import { FormControl, FormLabel, Typography, TextField, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
});


class FundraisingCreate extends Component {
  constructor() {
    super();
    this.state = {
      fundraiser: {
        title: "",
        description: "",
        amount: "",
        deadline: "",
      },
      snackbarOpen: false,
      snackbarMsg: ""
    }

  }

  snackbarClose = () => {
    this.setState({
      snackbarOpen: false
    });
  };


  updateText = event => {
    let updatedText = Object.assign({}, this.state.fundraiser);
    updatedText[event.target.name] = event.target.value;

  };

  validate = (data) => {
    if (!data.title) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Fundraiser title is required and must be at least 3 characters"
      });
    }
    if (!data.description) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Fundraiser description is required and must be at least 200 characters"
      });
    }
    if (!data.amount) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Fundraiser amount is required and must be at least $5"
      });
    }
    if (!data.deadline) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Fundraiser deadline is required"
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    // todo add length checks
    this.validate(this.state.fundraiser);
    // deadline must be later than today

  };


  render() {
    const { classes } = this.props;
    return (
      <div className="pageView">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
        <h2>Create New Fundraiser</h2>
        <form noValidate autoComplete="off">
          <Grid container item xs={12} spacing={1}>
            <FormControl>
              <FormLabel className={classes.formLabel}>
                What is your cause you'd like to fundraise for?
              </FormLabel>
              <TextField
                label="Write a cause title"
                placeholder="Write a cause title"
                name="title"
                margin="normal"
                row="5"
                variant="outlined"
                onChange={this.updateText}
              />
            </FormControl>
          </Grid>

          <Grid container item xs={12} spacing={1}>
            <FormControl>
              <FormLabel>
                Description
              </FormLabel>
              <TextField
                label="Write a cause title"
                placeholder="Write a cause title"
                name="title"
                margin="normal"
                row="5"
                variant="outlined"
                onChange={this.updateText}
              />
            </FormControl>
          </Grid>


          {/* <label>Amount</label>
          <input type="number"></input> */}
        </form>
        </Grid>
      </div>
    );
  }

}

export default withStyles(styles)(FundraisingCreate);