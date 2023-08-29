import React, { useEffect } from "react";
// Vamos a usar Params
import { Link, useParams } from "react-router-dom";
// Vamos a usar estados locales, asi cuando se carga el componente buscamos por id.
import { useDispatch, useSelector } from "react-redux";

import { searchById } from "../../redux/actions/dogsActions";
import "./Detail.css";
// Usamos nuestro loader.

export const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Cargamos el componente
  const { breedDetail } = useSelector((state) => state.breeds);
  useEffect(() => {
    dispatch(searchById(id));
  }, [dispatch, id]);
  // console.log(breedDetail);

  return (
    <div className="detailContainer">
      <Link to={"/home"} className="backDetail">
        Volver
      </Link>
      {breedDetail.length ? (
        <div className="details">
          <div className="detailsImg">
            <img src={breedDetail[0].image} alt="" />
          </div>
          <div className="detailBreed">
            <h1>{breedDetail[0].name}</h1>
            <div className="caracteristBreed">
              <div className="caracterist">
                <h2>Life span:</h2>
                <h3>{breedDetail[0].life_span.join(" - ")} Years.</h3>
              </div>
              <div className="caracterist">
                <h2>Weight:</h2>
                <h3>{breedDetail[0].weight.join(" - ")} Kg.</h3>
              </div>
              <div className="caracterist">
                <h2>Height:</h2>
                <h3>{breedDetail[0].height.join(" - ")} Cm.</h3>
              </div>
            </div>
            <div className="temperamentsDetail">
              <h2>Temperaments:</h2>
              <div className="temperamentsInfo">
                {breedDetail[0].temperaments
                  ? breedDetail[0].temperaments.map((temperament, index) => (
                      <h2 key={index}>{temperament}</h2>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
