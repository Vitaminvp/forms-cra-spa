import { handleActions, createAction } from "redux-actions";
import { uniqueId } from "../utils";
// import { createSelector } from 'reselect';

const SET_DATA = "FORMS/SET_DATA";
const ADD_DATA = "FORMS/ADD_DATA";
const RESET_DATA = "FORMS/RESET_DATA";

export const REDUCER_NAME = "forms";

export const setFormsData = createAction(SET_DATA);
export const addFormData = createAction(ADD_DATA);
export const resetFormsData = createAction(RESET_DATA);

const initialState = [];

export default handleActions(
  {
    [resetFormsData]: () => initialState,
    [setFormsData]: (state, { payload }) => payload,
    [addFormData]: (state, payload) => [
      ...state,
      { id: uniqueId("form_"), name: payload.payload }
    ]
  },
  initialState
);

export const contactsSelector = state => state[REDUCER_NAME];
