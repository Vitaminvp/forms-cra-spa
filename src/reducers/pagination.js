import { handleActions, createAction } from "redux-actions";
import { getReducerProp } from "../utils";
import { createSelector } from "reselect";
// import { createSelector } from 'reselect';

const SET_CURRENT_DATA = "PAGINATION/SET_CURRENT_DATA";
const SET_ALL_FORMS = "PAGINATION/SET_ALL_FORMS";
const RESET_DATA = "PAGINATION/RESET_DATA";

export const REDUCER_NAME = "pagination";

export const setCurrentData = createAction(SET_CURRENT_DATA);
export const setAllForms = createAction(SET_ALL_FORMS);
export const resetFormsData = createAction(RESET_DATA);

const initialState = {
  allForms: [],
  currentForms: [],
  currentPage: null,
  totalPages: null
};

export default handleActions(
  {
    [setCurrentData]: (state, payload) => ({
      ...state,
      ...payload
    }),
    [resetFormsData]: () => initialState,
    [setAllForms]: (state, { payload }) => ({
      ...state,
      allForms: payload
    })
  },
  initialState
);

export const paginationSelector = state => state[REDUCER_NAME];
export const allFormsSelector = createSelector(
  paginationSelector,
  getReducerProp("allForms")
);
