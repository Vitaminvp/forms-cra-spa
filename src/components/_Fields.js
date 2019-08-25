import * as React from "react";
import { Droppable } from "react-beautiful-dnd";
import { uniqueId } from "../utils";
import Field from "./Field";
import { List } from "@material-ui/core";
import ListItemPure from "./ListItem";

const FieldsList = ({
  id,
  fields,
  fieldsLength,
  addField,
  deleteField,
  textFieldsLength,
  numberFieldsLength,
  dropdownFieldsLength,
  checkMarkFieldsLength
}) => {
  return (
    <Droppable droppableId={id}>
      {provided => (
        <List innerRef={provided.innerRef} {...provided.droppableProps}>
          {fields.map((field, index) => {
            const props = {
              field,
              addField,
              deleteField,
              fieldsLength,
              textFieldsLength,
              numberFieldsLength,
              dropdownFieldsLength,
              checkMarkFieldsLength
            };
            return (
              <Field
                id={uniqueId()}
                key={index}
                index={index}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                {...props}
              />
            );
          })}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default FieldsList;
