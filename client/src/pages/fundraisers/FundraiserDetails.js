import React, { Component } from "react";
import Api from "../../util/Api";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

class FundraiserDetails extends Component {
  constructor() {
    super();

    this.state = {
      details: {
        creator: {}
      },
      liveDetails: false,
      fundraiserEnded: false
    };
  }

  async getDetails(info) {
    const {
      match: { params }
    } = this.props;
    let api = new Api(`fundraiser/${params.id}`);
    const request = await api.get(info);
    //console.log(api);
    //console.log(request);

    let data = request.contents;
    //console.log(data);
    let time = moment(data.deadline).format("MMMM Do YYYY");
    data.deadline = time;
    //console.log(data);
    let today = moment(Date.now()).format("MMMM Do YYYY");
    //console.log(today);
    let fundEnd;
    if (time >= today) {
      fundEnd = true;
    } else {
      fundEnd = false;
    }
    let isLive;
    data.live ? (isLive = true) : (isLive = false);

    if (request.success) {
      this.setState({
        details: { ...data },
        fundraiserEnded: fundEnd,
        liveDetails: isLive
      });
    }
  }
  componentDidMount() {
    console.log("ComponentDidMount");
    this.getDetails();
  }

  goLive = event => {
    //make a post request to the go live backend route

    //modify the contents of the page to show the live details
    //console.log(this.state.details.live);

    this.setState({
      liveDetails: event.target.value
    });
  };

  render() {
    //console.log(this.props);
    console.log(this.state);
    //console.log(this.state.details.creator.name);
    //console.log(this.state.liveDetails);
    const { classes } = this.props;
    const { details, liveDetails, fundraiserEnded } = this.state;

    //Provides the go live and edit contest button access only to same user
    const userButtonDisplay = () => {
      if (details.creator.id === details.creator_id) {
        return (
          <div>
            <button
              className={classes.greyButton}
              onClick={this.goLive}
              type="submit"
              value="true"
            >
              GO LIVE
            </button>
            <br />
            <button className={classes.greyButton} type="submit">
              EDIT CONTEST
            </button>
          </div>
        );
      } else return;
    };

    //Provide access to users only when live
    const accessForUser = () => {
      if (details.creator.id !== details.creator_id && !details.live) {
        return;
      } else {
        return (
          <div>
            <h2>{details.title}</h2>
            <h5>Created by {details.creator.name}</h5>
            <h3>Description</h3>
            <span>{details.description}</span>
            <br />
          </div>
        );
      }
    };

    //if fundraiser is past the expiration date show fundraisers ended UI
    const fundsEnded = () => {
      if (fundraiserEnded) {
        return <button className={classes.greyButton}>Fundraiser ended</button>;
      } else {
        return liveDisplay();
      }
    };

    //Show live details once the fundraiser is live
    const liveDisplay = () => {
      if (liveDetails) {
        return (
          <div>
            <div>Raised $0 of ${details.amount}</div>
            <span>THIS FUNDRAISER IS CURRENTLY LIVE</span>
            <div>ends on ${details.deadline}</div>
            <button className={classes.blueButton}>DONATE NOW</button>
          </div>
        );
      }
    };
    return (
      <div>
        <div>{accessForUser()}</div>
        <div>
          {liveDetails
            ? fundsEnded()
            : userButtonDisplay() && !details.creator.id
            ? ""
            : userButtonDisplay()}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  greyButton: {
    backgroundColor: "light grey",
    border: "1px solid rgb(202, 202, 202)",
    borderRadius: "20px",
    color: "black",
    padding: "10px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "700",
    marginTop: "20px",
    marginBottom: "50px",
    width: "200px",
    cursor: "pointer"
  },
  blueButton: {
    backgroundColor: "DeepSkyBlue",
    border: "1px solid rgb(202, 202, 202)",
    borderRadius: "20px",
    color: "white",
    padding: "10px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    marginTop: "20px",
    marginBottom: "50px",
    width: "200px",
    cursor: "pointer"
  }
});

export default withStyles(styles)(FundraiserDetails);
