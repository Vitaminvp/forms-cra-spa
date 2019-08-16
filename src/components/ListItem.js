import React from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import { Delete, Edit, StarBorder } from "@material-ui/icons";
import { NavLink, withRouter } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

const ListItemPure = withRouter(
  ({ id, name, index, history, isAuthorized }) => {
    return (
      <Draggable draggableId={id} index={index}>
        {provided => (
          <>
            <ListItem
              button
              innerRef={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <ListItemAvatar>
                <Avatar>
                  <StarBorder />
                </Avatar>
              </ListItemAvatar>
              <NavLink to={`/fill/${id}`} style={{ textDecoration: "none" }}>
                <ListItemText id={id} primary={name} />
              </NavLink>
              {isAuthorized && (
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" href="#">
                    <Delete />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      history.push(`/edit/${id}`);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider />
          </>
        )}
      </Draggable>
    );
  }
);

export default ListItemPure;
