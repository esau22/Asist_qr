import axios from "axios";
// Importamos nuestros actionsTypes.
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

import { startLoading, finishLoading } from "../actions/loaderActions";

// Traemos todas las razas.
export const getBreeds = () => {
  // Importante recibir el dispatch como parametro de funcion.
  return async (dispatch) => {
    dispatch(startLoading());
    // Traemos todas las razas.
    try {
      const breeds = await axios.get("/dogs");
      dispatch({
        type: GET_BREEDS,
        payload: breeds.data,
      });
      dispatch(finishLoading());
    } catch (error) {
      //Chequear esto despues....
      console.log(error.response.data);
    }
  };
};

// Traemos los temperamentos.
export const getTemperaments = () => {
  return async (dispatch) => {
    // Traemos todos los temperamentos.
    const temperaments = await axios.get("/temperaments");
    dispatch({
      type: GET_TEMPERAMENTS,
      payload: temperaments.data,
    });
  };
};

// Limpieamos el estado de breedDetail.
export const clearBreedDetail = (payload) => {
  return {
    type: CLEAR_BREED_DETAIL,
    payload,
  };
};

// Filtramos por temperamentos.
export const filterByTemperaments = (payload) => {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload,
  };
};

// Filtramos por origen.
export const filterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};

// Filtramos por name.
export const filterByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
};

// Filtramos por weight.
export const filterByWeight = (payload) => {
  return {
    type: FILTER_BY_WIEGHT,
    payload,
  };
};

// Filtramos por el nombre.
export const searchByName = (name) => {
  return async (dispatch) => {
    try {
      const resultSearch = await axios.get(
        `/dogs/${name ? `?name=${name}` : ""}`
      );
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: resultSearch.data,
      });
    } catch (error) {
      const resultSearch = await axios.get("/dogs");
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: resultSearch.data,
      });
    }

    // console.log(resultSearch.data);
    // console.log(
    //     `/breeds/${name ? `?name=${name}` : ''}`
    // );
  };
};

// Buscar por id.
export const searchById = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const resultSearch = await axios.get("/dogs/" + id);
    // console.log(resultSearch.data);
    dispatch({
      type: SEARCH_BY_ID,
      payload: resultSearch.data,
    });
    dispatch(finishLoading());
  };
};

// Agregar breed.
export const postBreed = (breed) => {
  return async (dispatch) => {
    const response = await axios.post("/dog", breed);
    return dispatch({
      type: POST_BREED,
      payload: response,
    });
  };
};
// export const postBreed = async (breed) => {
//     const response = await axios.post('/newbreed', breed);
//     return response;
// };
