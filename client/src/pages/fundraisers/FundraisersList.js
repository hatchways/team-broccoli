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
      fundraisers: [
        {
          title: "Donate to kill Lizards",
          donated_amount: 400000
        },
        {
          title: "Donate to heal Lizards",
          donated_amount: 211
        },
        {
          title: "Donate to impeach Lizards",
          donated_amount: 44132
        }
      ]
    };
  }

  componentDidMount() {
    //var token = localStorage.getItem("access_token");
    
    // fetch(`/fundraisers`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + token
    //   }
    // })
    // .then(res => res.json())
    // .then(fundraisers => {
    //   this.setState({
    //     fundraisers: fundraisers
    //   });
    // });
  }

  render() {
    return (
      <Container maxWidth="lg" style={{ marginTop: "2em" }}>
        <Grid container spacing={1}>
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
            <h1>Active Fundraisers</h1>
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
                  <p>{fundraiser.title}</p>
                  <FundraiserCard
                    title={fundraiser.title}
                    donated_amount={fundraiser.donated_amount}
                    image_url={fundraiser.image_url}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <h1 style={{ marginTop: "2em" }}>Recently Fundraised</h1>
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
                  title={fundraiser.title}
                  donated_amount={fundraiser.donated_amount}
                  image_url={fundraiser.image_url}
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
