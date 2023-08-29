import {
  GET_BREEDS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_ORIGIN,
  FILTER_BY_NAME,
  FILTER_BY_WIEGHT,
  SEARCH_BY_NAME,
  SEARCH_BY_ID,
  POST_BREED,
  CLEAR_BREED_DETAIL,
} from "../actionsTypes/actionsTypes";

// Definimos nuestro estado inicial.
const initialState = {
  breeds: [],
  breedsForFilter: [],
  breedDetail: [],
  temperaments: [],
};

// Definimos nuestro reducer con el state y su respectivo action.
function breedsReducers(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      // En nuestro estado cargamos las breeds.
      return {
        ...state,
        breeds: action.payload,
        breedsForFilter: action.payload,
      };
    case GET_TEMPERAMENTS:
      // En nuestro estado cargamos los temperaments.
      return {
        ...state,
        temperaments: action.payload,
      };
    case CLEAR_BREED_DETAIL:
      // Limpiamos nuestro estado de breedDetail.
      return {
        ...state,
        breedDetail: [],
      };
    case FILTER_BY_TEMPERAMENTS:
      const breedsFilter = state.breeds.filter((e) => {
        return e.temperaments.includes(action.payload);
      });
      return {
        ...state,
        breedsForFilter: breedsFilter,
      };
    case FILTER_BY_ORIGIN:
      let breedsFromApiOrDbOrAll = [];
      if (action.payload === "all") breedsFromApiOrDbOrAll = state.breeds;
      else if (action.payload === "db") {
        breedsFromApiOrDbOrAll = state.breeds.filter(
          (e) => typeof e.id === "string"
        );
      } else {
        breedsFromApiOrDbOrAll = state.breeds.filter(
          (e) => typeof e.id === "number"
        );
      }

      return {
        ...state,
        breedsForFilter: breedsFromApiOrDbOrAll,
      };
    case FILTER_BY_NAME:
      // Usamos la metodologia del sort de comparacion.
      const breedsByName =
        action.payload === "upward"
          ? state.breedsForFilter.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.breedsForFilter.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        breedsForFilter: breedsByName,
      };
    case FILTER_BY_WIEGHT:
      // Usamos la metodologia del sort de comparacion.
      const breedsByWeight =
        action.payload === "minor"
          ? state.breedsForFilter.sort(function (a, b) {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return 1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return -1;
              }
              return 0;
            })
          : state.breedsForFilter.sort(function (a, b) {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return -1;
              }
              if (parseInt(a.weight[1]) < parseInt(b.weight[1])) {
                return 1;
              }
              return 0;
            });
      console.log(breedsByWeight);
      return {
        ...state,
        breedsForFilter: breedsByWeight,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        breedsForFilter: action.payload,
      };
    case SEARCH_BY_ID:
      return {
        ...state,
        breedDetail: action.payload,
      };
    case POST_BREED:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default breedsReducers;
