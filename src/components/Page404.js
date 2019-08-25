import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  FourOhFour: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "#121212",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundSize: "cover",
    mixBlendMode: "overlay"
  },

  code: {
    fontSize: "180px",
    fontWeight: "bold",
    height: "100vh",
    color: "white",
    width: "100%",
    display: "flex",
    backgroundPosition: "center",
    alignItems: "center",
    backgroundSize: "cover",
    justifyContent: "center"
  }
};

const Page404 = withStyles(styles)(({classes}) => {
  return (
    <div className={classes.FourOhFour}>
      <div
        className={classes.bg}
        style={{ backgroundImage: "url(http://i.giphy.com/l117HrgEinjIA.gif)" }}
      ></div>
      <div className={classes.code}>404</div>
    </div>
  );
});

export default Page404;
