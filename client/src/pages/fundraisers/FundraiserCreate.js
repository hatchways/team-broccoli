import React, { Component } from "react";

import { theme } from "../../themes/theme";
import {
  FormControl,
  FormLabel,
  Typography,
  TextField,
  Container,
  Grid,
  InputAdornment,
  Icon,
  Button
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import { ImageUpload } from "../../components/ImageUpload";

import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker
} from "@material-ui/pickers";
import dayjs from "dayjs";
import DayjsUtils from "@date-io/dayjs";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  theme: theme
});

class FundraiserCreate extends Component {
  constructor() {
    super();
    this.state = {
      fundraiser: {
        title: "",
        description: "",
        amount: "",
        deadline: dayjs().add(30, "days"),
        live: false
      },
      date: dayjs()
        .add(30, "days")
        .format("YYYY-MM-DD"),
      time: dayjs().second(0),
      snackbarOpen: false,
      snackbarMsg: ""
    };
  }

  snackbarClose = () => {
    this.setState({
      snackbarOpen: false
    });
  };

  updateDate = date => {
    let deadline_date = this.state.fundraiser.deadline;

    deadline_date.year(date.year());
    deadline_date.month(date.month());
    deadline_date.date(date.date());

    this.setState({
      date: date.format("YYYY-MM-DD"),
      deadline: deadline_date
    });
  };

  updateTime = time => {
    let deadline_time = this.state.fundraiser.deadline;
    deadline_time.hour(time.hour());
    deadline_time.minute(time.minute());
    deadline_time.second(0);

    this.setState({
      time: time.second(0),
      deadline: deadline_time
    });
  };

  updateText = event => {
    let updatedText = Object.assign({}, this.state.fundraiser);
    updatedText[event.target.name] = event.target.value;

    this.setState({
      fundraiser: {
        title: updatedText["title"],
        description: updatedText["description"],
        amount: updatedText["amount"],
        deadline: this.state.fundraiser.deadline // we update this elsewhere
      }
    });
  };

  updateImageUrl = imageUrl => {
    this.setState({
      imageUrl: imageUrl
    });
  };

  validate = data => {
    if (!data.title) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg:
          "Fundraiser title is required and must be at least 3 characters"
      });
    }
    if (!data.description) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg:
          "Fundraiser description is required and must be at least 200 characters"
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
  };

  handleSubmit = event => {
    event.preventDefault();

    const token = localStorage.getItem("access_token");

    // todo add length checks
    this.validate(this.state.fundraiser);
    // deadline must be later than today

    if (!this.state.snackbarOpen) {
      // remove Z from the end because we're sending this as UTC time
      let deadline_string = this.state.fundraiser.deadline;
      deadline_string = deadline_string.toISOString();
      deadline_string = deadline_string.substring(
        0,
        deadline_string.length - 1
      );

      // Somehow changing the state and accessing it is too slow
      this.setState({
        fundraiser: {
          ...this.state.fundraiser,
          deadline: deadline_string,
          image_url: this.state.imageUrl
        }
      });

      // creating the updated fundraiser data
      const fundraiser_data = {
        ...this.state.fundraiser,
        deadline: deadline_string,
        image_url: this.state.imageUrl
      };

      let url = process.env.REACT_APP_SERVER_URL
      fetch(url + "/fundraiser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(fundraiser_data)
      })
        .then(res => res.json())
        .then(response => {
          // TODO: change the redirect to created fundraiser once implemented
          // response is a full fundraiser object, maybe we can pass the object
          // to the component directly to reduce network calls
          // var created_fundraiser_id = response.id
          // TODO: there's still no toggle for live column
          this.props.history.push("/fundraisers");
        });
    }
  };

  render() {
    return (
      <div className="pageView">
        <form noValidate autoComplete="off">
          <Container maxWidth="md">
            <Grid
              container
              direction="column"
              justify="space-around"
              alignItems="stretch"
              spacing={2}
            >
              <Typography
                variant="h3"
                style={{ marginTop: "1em", marginBottom: "0.75em" }}
                align="center"
                gutterBottom
              >
                Create New Fundraiser
              </Typography>

              <Grid item>
                <FormControl fullWidth required>
                  <FormLabel fullWidth>
                    What is your cause you'd like to fundraise for?
                  </FormLabel>
                  <TextField
                    placeholder="Write a cause title"
                    margin="normal"
                    name="title"
                    variant="outlined"
                    value={this.state.fundraiser.title}
                    onChange={this.updateText}
                    fullWidth
                  />
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl fullWidth required>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    placeholder="Details about the course you are fundraising"
                    name="description"
                    margin="normal"
                    multiline
                    rows="7"
                    variant="outlined"
                    value={this.state.fundraiser.description}
                    onChange={this.updateText}
                  />
                </FormControl>
              </Grid>

              <Grid container item>
                <Grid item xs={3}>
                  <FormControl fullWidth required>
                    <FormLabel>Amount</FormLabel>
                    <TextField
                      InputProps={{
                        startAdornment: <InputAdornment>$</InputAdornment>
                      }}
                      placeholder="100.00"
                      name="amount"
                      margin="normal"
                      variant="outlined"
                      value={this.state.fundraiser.amount}
                      onChange={this.updateText}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs></Grid>

                <Grid item xs={7}>
                  <FormControl fullWidth required>
                    <FormLabel>Deadline</FormLabel>
                    <Grid container direction="row">
                      <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DayjsUtils}>
                          <DatePicker
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <Icon>event</Icon>
                                </InputAdornment>
                              )
                            }}
                            value={this.state.date}
                            fullWidth
                            placeholder="Date"
                            name="date"
                            margin="normal"
                            inputVariant="outlined"
                            onChange={this.updateDate}
                            variant="dialog"
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DayjsUtils}>
                          <TimePicker
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <Icon>schedule</Icon>
                                </InputAdornment>
                              )
                            }}
                            value={this.state.time}
                            fullWidth
                            placeholder="Time"
                            name="time"
                            margin="normal"
                            inputVariant="outlined"
                            onChange={this.updateTime}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item>
                <FormLabel>Upload an image for your fundraiser</FormLabel>
                <ImageUpload imageUrlHandler={this.updateImageUrl} />
              </Grid>

              <Grid
                item
                align="center"
                style={{ marginTop: "1.5rem", padding: "1em" }}
              >
                <Button
                  onClick={this.handleSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{
                    padding: "1em 2em 1em 2em",
                    backgroundColor: "black"
                  }}
                >
                  Create Fundraiser
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(FundraiserCreate);
