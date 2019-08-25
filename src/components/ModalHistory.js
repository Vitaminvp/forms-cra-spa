import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import {
  IconButton,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Paper,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { History as HistoryIcon } from "@material-ui/icons";
import { FormattedMessage } from "react-intl";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function CustomizedDialogs({ history, children, disabled }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        size="medium"
        onClick={handleClickOpen}
        disabled={disabled}
        style={{ marginRight: 10 }}
      >
        <HistoryIcon />
        &nbsp;
        <FormattedMessage id="history" defaultMessage="History" />
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {children}
        </DialogTitle>
        <DialogContent dividers>
          {history.map((obj, index) => (
            <Paper style={{ marginBottom: 10 }} key={index}>
              <Table key={index}>
                <TableHead>
                  <TableRow>
                    {Object.keys(obj).map((key, index) => (
                      <TableCell key={index}>
                        {key === "id" ? "Date" : key}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {Object.keys(obj).map((key, index) => (
                      <TableCell key={index}>
                        {key === "id"
                          ? new Intl.DateTimeFormat("en-GB").format(obj[key])
                          : obj[key].toString()}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="close" defaultMessage="Close" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
