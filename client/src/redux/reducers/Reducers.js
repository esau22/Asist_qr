import {
  REGISTRAR_MATRICULA,
  REGISTRAR_ASISTENCIA,
  MOSTRAR_MATRICULA,
  MOSTRAR_ESTUDIANTE,
} from "../actionsTypes/actionsTypes";

const initialState = {
  matriculas: [],
  asistencias: [],
  estudiantes: [],
};

function MatriculaReducers(state = initialState, action) {
  switch (action.type) {
    case REGISTRAR_MATRICULA:
      return {
        ...state,
      };
    case REGISTRAR_ASISTENCIA:
      return {
        ...state,
        asistencias: [...state.asistencias, ...action.payload],
      };
    case MOSTRAR_MATRICULA:
      // En nuestro estado cargamos las breeds.
      return {
        ...state,
        matriculas: action.payload,
      };
    case MOSTRAR_ESTUDIANTE:
      // En nuestro estado cargamos las breeds.
      return {
        ...state,
        estudiantes: action.payload,
      };
    default:
      return state;
  }
}

export default MatriculaReducers;
