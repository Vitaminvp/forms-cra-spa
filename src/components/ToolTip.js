import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  tooltipBox: {
    position: "relative",
    display: "inline-flex"
  },
  tooltip: {
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    display: "initial",
    background: "rgba(0, 0, 0, 0.7)",
    color: "white",
    visibility: "hidden",
    padding: 5,
    borderRadius: 5,
    transition: "all 0.25s ease",
    bottom: "100%",
    whiteSpace: "nowrap",
    boxShadow: "-1px -1px 3px 0px rgba(0,0,0,0.75)",
    zIndex: 1
  },
  tooltipArrow: {
    position: "absolute",
    top: "100%",
    left: "50%",
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.7) transparent transparent",
    zIndex: 1
  }
});

export default function Tooltip({ children, text, ...rest }) {
  const [show, setShow] = React.useState(false);
  const classes = useStyles();
  return (
    <div className={classes.tooltipBox}>
      <div
        className={classes.tooltip}
        style={show ? { visibility: "visible" } : {}}
      >
        {text}
        <span className={classes.tooltipArrow} />
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
