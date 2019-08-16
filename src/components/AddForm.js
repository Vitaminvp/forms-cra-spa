import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Icon, Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

const AddForm = withRouter(({ history }) => {
  const onClick = () => {
    history.push("/new");
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        style={{ marginTop: 20 }}
      >
        <FormattedMessage id="addButton" defaultMessage="add form" />
        <Icon>add</Icon>
      </Button>
    </div>
  );
});

AddForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default AddForm;
