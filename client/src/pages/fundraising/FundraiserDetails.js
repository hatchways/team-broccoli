import React, { Component } from "react";

class FundraisingDetails extends Component {
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
  render() {
    return <div>FundraisingDetails</div>;
  }
}

export default FundraisingDetails;
