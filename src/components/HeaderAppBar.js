import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Language } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { withAuth } from "../services";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  flexBox: {
    display: "flex",
    alignItems: "center"
  },
  toolbar: {
    justifyContent: "space-between"
  },
  avatar: {
    zoom: "1.5",
    border: "1px solid",
    marginRight: 20
  },
  typography: {
    color: "#888888",
    textTransform: "UPPERCASE",
    fontSize: "inherit"
  }
}));

const HeaderAppBar = withAuth(
  withRouter(({ setLang, history, isAuthorized, logout, language }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    function handleMenu(event) {
      setAnchorEl(event.currentTarget);
    }
    function handleClose(lang="en") {
      setAnchorEl(null);
      if(typeof lang === "string" && lang !== language){
        setLang(lang);
      }

    }
    const token = Cookies.getJSON("jwt");
    const user = isAuthorized ? jwt.decode(token) : undefined;
    if (user) {
      const expiresAt = user.exp * 1000;
      if (Date.now() > expiresAt) {
        logout(history);
      }
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            {
              <>
                <div className={classes.flexBox}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Travis Howard"
                      src="/avatar.png"
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <Button color="inherit" onClick={() => history.push("/")}>
                    <FormattedMessage id="home" defaultMessage="Home" />
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => history.push("/profile")}
                  >
                    <FormattedMessage id="profile" defaultMessage="Profile" />
                  </Button>
                </div>
                <div className={classes.flexBox}>
                  {isAuthorized ? (
                    <div className={classes.flexBox}>
                      <Typography
                        variant="h6"
                        noWrap
                        className={classes.typography}
                      >
                        {user ? user.name : ""}
                      </Typography>
                      <Button color="inherit" onClick={() => logout(history)}>
                        <FormattedMessage id="logout" defaultMessage="Logout" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      color="inherit"
                      onClick={() => history.push("/login")}
                    >
                      <FormattedMessage id="login" defaultMessage="Login" />
                    </Button>
                  )}
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appBar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Language />
                  </IconButton>
                  <Menu
                    id="menu-appBar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => handleClose("en")}>
                      English
                    </MenuItem>
                    <MenuItem onClick={() => handleClose("ru")}>
                      Русский
                    </MenuItem>
                    <MenuItem onClick={() => handleClose("uk")}>
                      Українська
                    </MenuItem>
                  </Menu>
                </div>
              </>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  })
);

export default HeaderAppBar;
