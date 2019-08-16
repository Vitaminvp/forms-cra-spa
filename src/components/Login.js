import React from "react";
import { withAuth } from "../services";
import { Button, Container } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

const Login = withAuth(({ isAuthorized, authorize }) => {
  return isAuthorized ? (
    <Container
      maxWidth="sm"
      style={{
        background: "#eaeaea",
        padding: 20,
        borderRadius: 5,
        textAlign: "center",
        marginTop: 50
      }}
    >
      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={authorize}
      >
        Logout
      </Button>
    </Container>
  ) : (
    <Container
      maxWidth="sm"
      style={{
        background: "#eaeaea",
        padding: 20,
        borderRadius: 5,
        textAlign: "center",
        marginTop: 50
      }}
    >
      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={authorize}
      >
        <FormattedMessage id="login" defaultMessage="Login" />
      </Button>
    </Container>
  );

  // return isAuthorized ? (
  //   <Redirect to="/" />
  // ) : (
  //   <>
  //     <div>Please login</div>
  //     <button onClick={authorize}>Login</button>
  //   </>
  // );
});

export default Login;
