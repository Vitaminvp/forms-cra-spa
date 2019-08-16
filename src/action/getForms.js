import { setFormsData } from "../reducers/forms";
import { startLoading, finishLoading } from "../reducers/loading";
import { LOADING_FORMS } from "../constants/loading";
import { URL_FORM_LIST } from "../constants/api";

export default function getForms() {
  return dispatch => {
    dispatch(startLoading(LOADING_FORMS));
    fetch(URL_FORM_LIST)
      .then(response => {
        return response.json();
      })
      .then(forms => {
        dispatch(setFormsData(forms));
        dispatch(finishLoading(LOADING_FORMS));
      })
      .catch(console.log);
  };
}
