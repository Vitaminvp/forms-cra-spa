import { startLoading, finishLoading } from "../reducers/loading";
import { UPDATE_FORM } from "../constants/loading";
import { URL_FORM } from "../constants/api";
import getForms from "./getForms";

export default function putForm(id, body) {
  return dispatch => {
    dispatch(startLoading(UPDATE_FORM));
    fetch(`${URL_FORM}${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        return response.json();
      })
      .then(() => {
        getForms();
        dispatch(finishLoading(UPDATE_FORM));
      })
      .catch(console.log);
  };
}
