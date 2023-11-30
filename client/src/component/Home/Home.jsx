import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Importamos nuestras acciones.
import { mostrarMatricula } from "../../redux/actions/Actions";
import { Card } from "../Card/Card";
import "./Home.css";

export const Home = () => {
  // Traemos el stado global.
  const dispatch = useDispatch();
  const { matriculas } = useSelector((state) => state.matricula);

  /**
   * Traemos las breeds cuando se monta el componente.
   */
  useEffect(() => {
    dispatch(mostrarMatricula());
  }, []);

  // Usamos nuestro loader.
  //const { display } = useSelector((state) => state.loader);

  // Traemos todos los elementos renderizados de html
  // Definimos una funcion que modifique mi estado local.

  // Reseteamos los valores en breeds.
  const handleClickReset = (e) => {
    e.preventDefault();
    dispatch(mostrarMatricula());
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
          {matriculas &&
            matriculas.map((matricula) => (
              <Link
                className=""
                to={`/home/${matricula.id_matricula}`}
                key={matricula.id_matricula}
              >
                <Card
                  id_matricula={matricula.id_matricula}
                  nombre={matricula.nombre}
                  apellido={matricula.apellido}
                  correo={matricula.correo}
                  imagen={`Id_estudiante: ${matricula.id_estudiante},Nombre: ${matricula.nombre}, Apellido: ${matricula.apellido}, Correo: ${matricula.correo}`}
                  key={matricula.id_matricula}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
