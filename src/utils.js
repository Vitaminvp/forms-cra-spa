import get from "lodash/get";
import uniqueId from "lodash/uniqueId";

const getReducerProp = prop => state => get(state, prop, {});
const getRatingProp = prop => state => get(state, prop, 0);
const getFields = prop => state => get(state, prop, []);

export { uniqueId, getReducerProp, getFields, getRatingProp };
