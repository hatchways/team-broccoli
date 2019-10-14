import React, { Component } from "react";
import Api from "../../util/Api";
import { withStyles } from "@material-ui/core/styles";

class FundraiserDetails extends Component {
  constructor() {
    super();

    this.state = {
      details: {
        creator: {}
      }
    };
  }

  async getDetails(info) {
    const {
      match: { params }
    } = this.props;
    let api = new Api(`fundraiser/${params.id}`);
    const request = await api.get(info);
    console.log(api);
    console.log(request);

    if (request.success) {
      this.setState({
        details: { ...request.contents }
      });
    }
  }
  componentDidMount() {
    console.log("ComponentDidMount");

    this.getDetails();
  }

  render() {
    //console.log(this.props);
    console.log(this.state.details);
    console.log(this.state.details.creator.name);
    const { classes } = this.props;
    const { details } = this.state;

    const userButtonDisplay = () => {
      if (details.creator.id === details.creator_id) {
        return (
          <div>
            <button className={classes.greyButton} type="submit">
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

    const accessForUser = () => {
      if (details.creator.id !== details.creator_id && !details.live) {
        return (
          <div>The page is not live or you do not have access to this page</div>
        );
      } else {
        return (
          <div>
            <div>
              <h2>{details.title}</h2>
              <h5>Created by {details.creator.name}</h5>
              <br />
              <h3>Description</h3>
              <span>{details.description}</span>
              <br />
            </div>
            <div>{!details.creator.id ? "" : userButtonDisplay()}</div>
          </div>
        );
      }
    };
    return <div>{accessForUser()}</div>;
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
  }
});

export default withStyles(styles)(FundraiserDetails);
