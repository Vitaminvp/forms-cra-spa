
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../services";

const PrivateRoute = withAuth(({ component: RouteComponent, isAuthorized, ...rest }) => {

  const render = props =>
      !!isAuthorized === true ? <RouteComponent {...props} /> : <Redirect to="/" />;

  return (<Route render={render} {...rest} />);
});

export default PrivateRoute;
