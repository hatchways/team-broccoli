import React, { Component } from "react";
import FundraiserCard from "../../components/FundraiserCard";
import {
  Grid,
  Container,
  Typography,
  Icon,
  Fab
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import RoundedTextField from "../../components/RoundedTextField";
import Api from "../../util/Api";

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

class FundraiserList extends Component {
  constructor() {
    super();
    this.state = {
      fundraisers: null,
      isLoading: true
    };
  }

  async componentDidMount() {
    let api = new Api("fundraisers");
    const result = await api.get();

    if (result.success) {
      this.setState({
        fundraisers: result.contents
      });
    }
    this.setState({isLoading: false});
    // handle errors
  }

  render() {
    if (this.state.isLoading == true) return ("Loading...");
    return (
      <Container maxWidth="lg" style={{ marginTop: "2em" }}>
        <Grid container spacing="1">
          <Grid container direction="row" alignItems="center">
            <Grid item xs={7}>
              <RoundedTextField
                autoFocus
                name="search_fundraisers"
                placeholder="Search Fundraisers by name"
              ></RoundedTextField>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography>Filter by end date:</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Fab small>
                    <Icon>schedule</Icon>
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: "2em" }}>
            <h1>{
              (this.state.fundraisers.length == 0 || this.state.fundraisers == null)
                ? "No Active Fundraisers Found"
                : "Active Fundraisers"
            }</h1>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            {this.state.fundraisers.map(fundraiser => {
              return (
                <Grid item>
                  <FundraiserCard
                    id={fundraiser.id}
                    title={fundraiser.title}
                    donated_amount={fundraiser.donated_amount}
                    image_url={fundraiser.image_url}
                    {...this.props}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <h1 style={{ marginTop: "2em" }}>{
              (this.state.fundraisers.length == 0 || this.state.fundraisers == null)
                ? "No Recently Fundraised"
                : "Recently Fundraised"
            }</h1>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          {this.state.fundraisers.map(fundraiser => {
            return (
              <Grid item>
                <FundraiserCard
                  id={fundraiser.id}
                  title={fundraiser.title}
                  donated_amount={fundraiser.donated_amount}
                  image_url={fundraiser.image_url}
                  {...this.props}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(FundraiserList);
