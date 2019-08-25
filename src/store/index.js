import { createStore, applyMiddleware, combineReducers } from "redux";
import throttle from "lodash/throttle";
import { loadState, saveState } from "../localStorage";
// import { save, load } from "redux-localstorage-simple";

export const configStore = (reducers, middlewares) => {
  const preLoadedState = loadState("state");

  // const createStoreWithMiddleware = applyMiddleware(
  //   save()
  // )(createStore);

  // const store = createStoreWithMiddleware(
  //   combineReducers(reducers),
  //   load(),
  //   applyMiddleware(...middlewares)
  // );

  const store = createStore(
      combineReducers(reducers),
      preLoadedState,
      applyMiddleware(...middlewares)
  );
  store.subscribe(
    throttle(() => {
      saveState({
        lang: store.getState().lang
      }, "state");
    }, 1000)
  );
  return store;
};
