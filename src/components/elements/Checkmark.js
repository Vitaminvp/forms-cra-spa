import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CheckMark = ({
  field: { type, name, label },
  checked,
  handleChange,
  disabled = false
}) => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={event => {
              handleChange(name, event.target.checked);
            }}
            color="secondary"
            inputProps={{
              "aria-label": "secondary checkbox"
            }}
            disabled={disabled}
          />
        }
        label={label}
      />
    </div>
  );
};

CheckMark.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default CheckMark;
