import * as React from "react";
import { List } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import ListItemPure from "../components/ListItem";

const ShortList = ({ forms, isAuthorized, setEdit }) => {
  return (
    <Droppable droppableId="listFormsId">
      {provided => (
        <List innerRef={provided.innerRef} {...provided.droppableProps}>
          {forms.map(({ id, name }, index) => {
            return (
              <ListItemPure
                index={index}
                id={id}
                name={name}
                key={id}
                isAuthorized={isAuthorized}
                setEdit={setEdit}
              />
            );
          })}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default ShortList;
