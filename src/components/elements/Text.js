import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const Text = ({
  field: { type, name, label, placeholder },
  value,
  handleChange,
  disabled = false
}) => {
  return (
    <div>
      <TextField
        id={name}
        name={name}
        label={label}
        placeholder={placeholder}
        margin="normal"
        onChange={event => handleChange(name, event.target.value)}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

// Text.DefaultProps = {
//   value: ""
// };

Text.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string
  }),
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string
};

export default Text;
