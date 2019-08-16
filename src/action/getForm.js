import { startLoading, finishLoading } from "../reducers/loading";
import { LOADING_FORM } from "../constants/loading";
import { setForm } from "../reducers/selectedForm";
import { URL_FORM } from "../constants/api";

export default function getForm(id) {
  return dispatch => {
    dispatch(startLoading(LOADING_FORM));
    fetch(`${URL_FORM}${id}`)
      .then(response => {
        return response.json();
      })
      .then(form => {
        dispatch(setForm(form));
        dispatch(finishLoading(LOADING_FORM));
      })
      .catch(console.log);
  };
}
