import { START_LOADING, FINISH_LOADING } from "../actions/loaderActions";

const initialState = {
  display: false,
};

function loader(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        display: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        display: false,
      };
    default:
      return state;
  }
}

export default loader;
