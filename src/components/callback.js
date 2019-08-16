import React, { Component } from "react";
import { withAuth } from "../services";
import {withRouter} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

class Callback extends Component {
  componentDidMount() {
    const { handleAuthentication, history } = this.props;
    if(handleAuthentication){
        console.log("handleAuthentication")
        handleAuthentication(history)
    }
  }

  render() {
    return      <CircularProgress variant="determinate" color="secondary" />;
  }
}

export default withAuth(withRouter(Callback));
