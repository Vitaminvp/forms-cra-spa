import { startLoading, finishLoading } from "../reducers/loading";
import { CREATE_FORM } from "../constants/loading";
import { URL_FORM } from "../constants/api";
import getForms from "./getForms";

export default function postForm(body) {
  return dispatch => {
    dispatch(startLoading(CREATE_FORM));
    fetch(`${URL_FORM}new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        return response.json();
      })
      .then(() => {
        dispatch(finishLoading(CREATE_FORM));
        dispatch(getForms());
      })
      .catch(console.log);
  };
}
