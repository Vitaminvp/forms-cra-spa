import { startLoading, finishLoading } from "../reducers/loading";
import { NEW_FORM } from "../constants/loading";
import { setForm } from "../reducers/selectedForm";

const newForm = form => {
  return dispatch => {
    dispatch(startLoading(NEW_FORM));
    dispatch(setForm(form));
    dispatch(finishLoading(NEW_FORM));
  };
};
export default newForm;
