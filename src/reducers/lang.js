import { handleActions, createAction } from "redux-actions";
import get from "lodash/get";
import { createSelector } from "reselect";
import { getReducerProp } from "../utils";

const SET_LANG = "LANG/SET_LANG";

export const REDUCER_NAME = "lang";

export const setLang = createAction(SET_LANG);

const initialState = { value: "en" };

export default handleActions(
  {
    [setLang]: (state, { payload }) => ({
      value: payload
    })
  },
  initialState
);
const stateSelector = state => get(state, REDUCER_NAME);

export const langSelector = createSelector(
  stateSelector,
  getReducerProp("lang")
);
