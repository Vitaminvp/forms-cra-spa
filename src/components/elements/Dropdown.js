import React from "react";
import PropTypes from "prop-types";
import { TextField, MenuItem } from "@material-ui/core";

const Dropdown = ({ field, value = "", handleChange, disabled = false }) => {
  const { name, label, items = [] } = field;
  const item = items.find(item => item.name === value);
  return (
    <div>
      <TextField
        id={name}
        select
        label={label}
        value={item ? item.value : ""}
        helperText={label}
        margin="normal"
        onChange={event =>
          handleChange(
            name,
            disabled
              ? ""
              : items.find(item => item.value === event.target.value).name
          )
        }
        style={{ minWidth: 160 }}
        disabled={disabled}
      >
        {items.map(({ name, value }, index) => (
          <MenuItem value={value} key={index}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

// Dropdown.DefaultProps = {
//   value: "",
//   field: { items: [] }
// };

Dropdown.propTypes = {
  field: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    items: PropTypes.array
  }),
  default: PropTypes.number,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default Dropdown;
