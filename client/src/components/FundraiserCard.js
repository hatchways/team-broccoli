import React, { Component } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Typography
} from "@material-ui/core";

class Fundraiser extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ width: "300px" }}>
        <Card>
          <CardActionArea>
            <CardMedia component="div" align="center">
              <Typography
                style={{ textAlign: "center" }}
                variant="h5"
                component="h5"
                style={{
                  width: "280px",
                  position: "absolute",
                  color: "white",
                  top: "40%",
                  textShadow: "-0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black"
                }}
              >
                {this.props.title}
              </Typography>
              <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{
                    width: "280px",
                    position: "absolute",
                    color: "white",
                    position: "absolute",
                    color: "white",
                    top: "60%",
                    textShadow: "-0.2px 0 black, 0 0.2px black, 0.2px 0 black, 0 -0.2px black"
                  }}
                >
                  {this.props.donated_amount == null
                    ? "Needs YOUR Support"
                    : this.props.donated_amount + " donated"}
                </Typography>

              <img
                component="img"
                alt="Fundraiser image"
                height="200"
                src={this.props.image_url}
                title="Fundraiser Image"
              />
            </CardMedia>
            <CardContent align="center">
              <Fab variant="extended" style={{ backgroundColor: "#ffffff", padding: "0 2.5em 0 2.5em", boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.5)" }}>
                Details
              </Fab>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default Fundraiser;
