import React from "react";
import Button from "@material-ui/core/Button";
import { Menu, Badge, MenuItem, Fade, Fab } from "@material-ui/core";
import { DEFAULT_FORM, MAX_FIELDS } from "../constants/selectedForm";
import { uniqueId } from "../utils";
import AddIcon from "@material-ui/icons/Add";
import { FormattedMessage } from "react-intl";
import Tooltip from "./ToolTip";

export default function FadeMenu({
  addField,
  fieldsLength,
  buttonForm = true
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(field) {
    setAnchorEl(null);
    if (Object.keys(field).length < 10) {
      addField({
        ...field,
        name: `name-${uniqueId() + 10}`,
        id: `id-${uniqueId()}`
      });
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      {buttonForm ? (
        <Badge color="primary" badgeContent={fieldsLength}>
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={fieldsLength >= MAX_FIELDS}
          >
            <FormattedMessage id="addElement" defaultMessage="Add Element" />
          </Button>
        </Badge>
      ) : (
        <Tooltip text="Add new form Element">
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            disabled={fieldsLength >= MAX_FIELDS}
            onClick={handleClick}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {DEFAULT_FORM.fields.map(field => (
          <MenuItem onClick={() => handleClose(field)} key={field.type}>
            {field.type.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
