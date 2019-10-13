import { NavLink, Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import React from "react";
import FundraiserCreate from "../pages/fundraisers/FundraiserCreate";

function NotFoundPage({ props }) {
  return (
    <Container>
      <h1>404</h1>
      <h2>Page Not Found</h2>

    </Container>
  );
}

export default NotFoundPage;
