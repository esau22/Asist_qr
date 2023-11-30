import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Importamos nuestras acciones.
import { mostrarAsistencia } from "../../redux/actions/Actions";
import { CardAsistencia } from "../Card/CarAsistencia";
//import "./Home.css";

export const DetailAsistencia = () => {
  // Traemos el stado global.
  const dispatch = useDispatch();
  const { asistencias } = useSelector((state) => state.asistencia);

  /**
   * Traemos las breeds cuando se monta el componente.
   */
  useEffect(() => {
    dispatch(mostrarAsistencia());
  }, []);

  // Usamos nuestro loader.
  //const { display } = useSelector((state) => state.loader);

  // Traemos todos los elementos renderizados de html
  // Definimos una funcion que modifique mi estado local.

  // Reseteamos los valores en breeds.
  const handleClickReset = (e) => {
    e.preventDefault();
    dispatch(mostrarAsistencia());
  };

  return (
    <div className="homeContainer">
      <div className="filters">
        <div className="resetButton">
          <button
            onClick={(e) => {
              handleClickReset(e);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="cardsContainer">
        <div className="cards">
          {asistencias &&
            asistencias.map((asistencia) => (
              <Link
                className=""
                to={`/detail/${asistencia.id_asistencia}`}
                key={asistencia.id_asistencia}
              >
                <CardAsistencia
                  id_asistencia={asistencia.id_asistencia}
                  id_estudiante={asistencia.id_estudiante}
                  fecha={asistencia.fecha}
                  estado={asistencia.estado}
                  key={asistencia.id_asistencia}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
