import React, { Component } from "react";

class FundraisingDetails extends Component {
<<<<<<< HEAD
  constructor() {
    super();

    this.state = {
      details: []
    };
  }
  componentDidMount() {
    fetch("/fundraiser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.fundraiser)
    });
  }
=======
>>>>>>> 83756520ebb21cb62fba224071e7886df9c54d64
  render() {
    return <div>FundraisingDetails</div>;
  }
}

export default FundraisingDetails;
