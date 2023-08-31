import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import dogs from "../reducers/dogsReducers";
import loader from "../reducers/loaderReducers";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const reducers = combineReducers({
  breeds: dogs,
  loader: loader,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
