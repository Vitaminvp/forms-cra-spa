import { handleActions, createAction } from "redux-actions";
import get from "lodash/get";
import { createSelector } from "reselect";
import { getReducerProp } from "../utils";

const SET_EDIT = "EDIT/SET_EDIT";

export const REDUCER_NAME = "edit";

export const setEdit = createAction(SET_EDIT);

const initialState = { editing: false };

export default handleActions(
    {
      [setEdit]: (state, { payload }) => ({
        editing: payload
      })
    },
    initialState
);
const stateSelector = state => get(state, REDUCER_NAME);

export const editSelector = createSelector(
    stateSelector,
    getReducerProp("editing")
);
