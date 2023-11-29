import axios from "axios";
import {
  REGISTRAR_MATRICULA,
  REGISTRAR_ASISTENCIA,
  MOSTRAR_MATRICULA,
  MOSTRAR_ESTUDIANTE,
} from "../actionsTypes/actionsTypes";

import { startLoading, finishLoading } from "./loaderActions";

export const mostrarEstudiante = () => {
  // Importante recibir el dispatch como parametro de funcion.
  return async (dispatch) => {
    dispatch(startLoading());
    // Traemos todas las razas.
    try {
      const estudiante = await axios.get("/estudiantes");
      dispatch({
        type: MOSTRAR_ESTUDIANTE,
        payload: estudiante.data,
      });
      dispatch(finishLoading());
    } catch (error) {
      //Chequear esto despues....
      console.log(error.response.data);
    }
  };
};

export const mostrarMatricula = () => {
  // Importante recibir el dispatch como parametro de funcion.
  return async (dispatch) => {
    dispatch(startLoading());
    // Traemos todas las razas.
    try {
      const matricula = await axios.get("/matriculas");
      dispatch({
        type: MOSTRAR_MATRICULA,
        payload: matricula.data,
      });
      dispatch(finishLoading());
    } catch (error) {
      //Chequear esto despues....
      console.log(error.response.data);
    }
  };
};

export const registrarMatricula = (matricula) => {
  // Importante recibir el dispatch como parametro de funcion.
  return async (dispatch) => {
    const response = await axios.post("/matricula", matricula);
    return dispatch({
      type: REGISTRAR_MATRICULA,
      payload: response,
    });
  };
};

export const registrarAsistencia = (asistencia) => {
  // Importante recibir el dispatch como parametro de funcion.
  return async (dispatch) => {
    const response = await axios.post("/asistencia", asistencia);
    return dispatch({
      type: REGISTRAR_ASISTENCIA,
      payload: response,
    });
  };
};
