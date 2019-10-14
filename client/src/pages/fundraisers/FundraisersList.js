import React, { Component } from "react";
import FundraiserCard from '../../components/FundraiserCard';
import { Grid, Container } from "@material-ui/core";


class FundraiserList extends Component {
  constructor() {
    super();
    this.state = {
      fundraisers : [
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
        },
      ]
    }
  }
  componentDidMount() {
    const url = process.env.REACT_APP_SERVER_URL
    var token = localStorage.getItem('access_token')

    fetch(url + `/fundraisers`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      }
    })
      .then(res => res.json())
      .then(fundraisers => {
        this.setState({
          fundraisers: fundraisers,
        })
      })
  }
  render() {
    return (
      <div>
        <Container maxWidth="lg">

          <h1>Active Fundraisers</h1>
          <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
          >
          {
            this.state.fundraisers.map(fundraiser => {
              return  <Grid item>
                        <FundraiserCard title={fundraiser.title} donated_amount={fundraiser.donated_amount} image_url={fundraiser.image_url}/>
                      </Grid>
            })
          }
          </Grid>

          <h1 style = {{ marginTop: "2em" }}>Recently Fundraised</h1>
          <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
          >
          {
            this.state.fundraisers.map(fundraiser => {
              return  <Grid item>
                        <FundraiserCard title={fundraiser.title} donated_amount={fundraiser.donated_amount}/>
                      </Grid>
            })
          }
          </Grid>
        </Container>
      </div>
    );
  }
}


export default FundraiserList;
