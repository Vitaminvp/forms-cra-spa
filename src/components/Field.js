import React from "react";
import { Divider, ListItem } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

import TextPure from "./elements/Text";
import DropdownPure from "./elements/Dropdown";
import NumberPure from "./elements/Number";
import CheckMarkPure from "./elements/Checkmark";
import withHOCField from "./elements/withHOCField";
import { FIELD_TYPES } from "../constants/selectedForm";

const Text = withHOCField(TextPure);
const Dropdown = withHOCField(DropdownPure);
const Number = withHOCField(NumberPure);
const CheckMark = withHOCField(CheckMarkPure);

const Field = ({
  id,
  field,
  index,
  addField,
  deleteField,
  fieldsLength,
  textFieldsLength,
  numberFieldsLength,
  dropdownFieldsLength,
  checkMarkFieldsLength
}) => {
  let Item;

  switch (field.type) {
    case FIELD_TYPES.TEXT:
      Item = (
        <Text
          field={field}
          fieldsTypeLength={textFieldsLength}
          addField={addField}
          deleteField={deleteField}
          fieldsLength={fieldsLength}
        />
      );
      break;
    case FIELD_TYPES.NUMBER:
      Item = (
        <Number
          field={field}
          fieldsTypeLength={numberFieldsLength}
          addField={addField}
          deleteField={deleteField}
          fieldsLength={fieldsLength}
        />
      );
      break;
    case FIELD_TYPES.DROPDOWN:
      Item = (
        <Dropdown
          field={field}
          fieldsTypeLength={dropdownFieldsLength}
          addField={addField}
          deleteField={deleteField}
          fieldsLength={fieldsLength}
        />
      );
      break;
    case FIELD_TYPES.CHECKMARK:
      Item = (
        <CheckMark
          field={field}
          fieldsTypeLength={checkMarkFieldsLength}
          addField={addField}
          deleteField={deleteField}
          fieldsLength={fieldsLength}
        />
      );
      break;
    default:
      Item = <div key={index}>{`Unhandled type: ${field.type}`}</div>;
  }

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <ListItem
          button
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          id={field.name}
        >
          {Item}
        </ListItem>
      )}
    </Draggable>
  );
};
export default Field;
