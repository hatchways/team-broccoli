import React, { Component } from "react";
import Api from "../../util/Api";
import DonateDialog from "../../components/DonateDialog";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Link } from "react-router-dom";

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

    let data = request.contents;
    let time = moment(data.deadline).format("MMMM Do YYYY");
    data.deadline = time;
    let today = moment(Date.now()).format("MMMM Do YYYY");

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
    this.getDetails();
  }

  goLive = event => {
    //make a post request to the go live backend route TODO

    //modify the contents of the page to show the live details
    this.setState({
      liveDetails: event.target.value
    });
  };

  render() {
    const {
      classes,
      match: { params }
    } = this.props;
    const { details, liveDetails, fundraiserEnded } = this.state;

    //Provides the go live and edit contest button access only to same user
    const userButtonDisplay = () => {
      if (details.creator.id !== details.creator_id && !details.live) {
        return;
      } else if (details.creator.id === details.creator_id) {
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
            <Link to={`/fundraiser/${params.id}/edit`}>
              <button className={classes.greyButton} type="submit">
                EDIT CONTEST
              </button>
            </Link>
          </div>
        );
      }
    };

    //Provide access to users only when live
    const accessForUser = () => {
      if (details.creator.id !== details.creator_id && !details.live) {
        return;
      } else if (details.creator.id === details.creator_id || details.live) {
        return (
          <div>
            <h2>{details.title}</h2>
            <h5>Created by {details.creator.name}</h5>
            <h3>Description</h3>
            <span>{details.description}</span>
          </div>
        );
      }
    };

    //if fundraiser is past the expiration date show fundraisers ended UI
    const fundsEnded = () => {
      if (fundraiserEnded) {
        return (
          <div>
            <div className={classes.amountBox}>
            Raised ${Math.floor(details.current_funding / 100)} of ${details.amount}
            </div>
            <input className={classes.greyInput}>Fundraiser ended</input>
          </div>
        );
      } else {
        return liveDisplay();
      }
    };

    //Show live details once the fundraiser is live
    const liveDisplay = () => {
      if (liveDetails) {
        return (
          <div>
            <div className={classes.amountBox}>
            Raised ${Math.floor(details.current_funding / 100)} of ${details.amount}
            </div>
            <span className={classes.greenText}>
              THIS FUNDRAISER IS CURRENTLY LIVE
            </span>
            <div className={classes.deadline}>ends on {details.deadline}</div>
            <DonateDialog
              className={classes.blueButton}
              stripe_description={details.title}
              fundraiser_id={details.id}
            />
          </div>
        );
      }
    };

    const sendMessage = () => {
      if (details.creator.id !== details.creator_id && !details.live) {
        return;
      } else if (details.live) {
        return (
          <div>
            <button className={classes.greyButton} type="submit">
              Send Message
            </button>
          </div>
        );
      }
    };

    return (
      <div className={classes.layout}>
        <div className={classes.grid1}>{accessForUser()}</div>
        <div className={classes.grid2}>
          {sendMessage()}
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
    marginBottom: "20px",
    width: "200px",
    cursor: "pointer"
  },
  greyInput: {
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
    marginBottom: "20px",
    width: "200px"
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
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    gridGap: "1em"
  },
  grid1: {
    marginLeft: "50px",
    marginTop: "20px"
  },
  grid2: {
    marginTop: "20px"
  },
  greenText: {
    color: "limegreen"
  },
  amountBox: {
    background: "WhiteSmoke",
    padding: "1em",
    marginRight: "70px",
    fontWeight: 700
  },
  deadline: {
    fontWeight: 700
  }
});

export default withStyles(styles)(FundraiserDetails);
