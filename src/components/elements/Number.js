import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const Number = ({
  field: { name, label, placeholder },
  handleChange,
  value,
  disabled = false
}) => (
  <div>
    <TextField
      id={name}
      name={name}
      label={label}
      value={value}
      onChange={event => handleChange(name, event.target.value)}
      type="number"
      margin="normal"
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);

// Number.DefaultProps = {
//   value: ""
// };

Number.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    items: PropTypes.array,
    placeholder: PropTypes.string
  }),
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string
};

export default Number;
