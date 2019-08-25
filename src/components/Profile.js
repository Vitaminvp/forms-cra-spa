import React from "react";
import { Container } from "@material-ui/core";
import { withAuth } from "../services";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import ControlledExpansionPanels from "./ControlledAccordion";

const Profile = withRouter(
  withAuth(({ isAuthorized, logout }) => {
    const token = Cookies.getJSON("jwt");
    const user = jwt.decode(token);
    if (user) {
      const expiresAt = user.exp * 1000;
      if (Date.now() > expiresAt) {
        logout();
      }
    }
    return (
      isAuthorized && (
        <Container style={{ marginTop: 20 }}>
          <ControlledExpansionPanels user={user} />
        </Container>
      )
    );
  })
);

export default Profile;
