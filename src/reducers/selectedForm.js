import { handleActions, createAction } from "redux-actions";
import { createSelector } from "reselect";
import { getFields, getReducerProp, getRatingProp } from "../utils";
import get from "lodash/get";
import { DEFAULT_FORM } from "../constants/selectedForm";

const SET_FORM = "SELECTED_FORM/SET_FORM";
const RESET_FORM = "SELECTED_FORM/RESET_FORM";
const ADD_FORM_FIELD = "SELECTED_FORM/ADD_FORM_FIELD";
const DEL_FORM_FIELD = "SELECTED_FORM/DEL_FORM_FIELD";
const ADD_HISTORY = "SELECTED_FORM/ADD_HISTORY";
const UPDATE_FIELDS = "SELECTED_FORM/UPDATE_FIELDS";
const UPDATE_NAME = "SELECTED_FORM/UPDATE_NAME";
const VOTE = "RATING/VOTE";

export const REDUCER_NAME = "selectedForm";

export const setForm = createAction(SET_FORM);
export const resetForm = createAction(RESET_FORM);
export const addFormField = createAction(ADD_FORM_FIELD);
export const deleteFormField = createAction(DEL_FORM_FIELD);
export const addHistory = createAction(ADD_HISTORY);
export const updateFields = createAction(UPDATE_FIELDS);
export const updateName = createAction(UPDATE_NAME);
export const setVote = createAction(VOTE);

const initialState = DEFAULT_FORM;

export default handleActions(
  {
    [setVote]: (state, { payload }) => ({
      ...state,
      rating: {
        votes: state.rating ? state.rating.votes + 1 : 1,
        rating: payload
      }
    }),
    [resetForm]: () => initialState,
    [setForm]: (state, { payload }) => payload,
    [addFormField]: (state, { payload }) => ({
      ...state,
      fields: [...state.fields, payload]
    }),
    [addHistory]: (state, { payload }) => ({
      ...state,
      history: state.history ? [...state.history, payload] : [payload]
    }),
    [updateFields]: (state, { payload }) => ({
      ...state,
      fields: [...payload]
    }),
    [updateName]: (state, { payload }) => ({
      ...state,
      name: payload
    }),
    [deleteFormField]: (state, { payload }) => ({
      ...state,
      fields: [...state.fields.filter(field => field.name !== payload)]
    })
  },
  initialState
);

export const formSelector = state => state[REDUCER_NAME];
export const formFields = createSelector(
  formSelector,
  getFields("fields")
);
export const formHistory = createSelector(
  formSelector,
  getFields("history")
);

export const formHistoryLength = state => get(formHistory(state), "length");

export const fieldTypeLength = (state, type = "") =>
  get(formFields(state).filter(field => field.type === type), "length");

export const fieldLength = state => get(formFields(state), "length");

const ratingsSelector = createSelector(
  formSelector,
  getReducerProp("rating")
);

export const ratingSelector = createSelector(
  ratingsSelector,
  getRatingProp("rating")
);

// export const ratingSelector = get(ratingsSelector, "rating");
