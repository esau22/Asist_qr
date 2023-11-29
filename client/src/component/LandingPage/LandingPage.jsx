import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import image from "../../image/ordenador.png";

export const LandingPage = () => {
  return (
    <div className="landingContainer">
      <div className="landing">
        <div className="landingInfo">
          <span>IE:ANONIMO</span>
          <h1>CONTROL DE ASISTENCIA</h1>
          <Link to="/home">
            <button className="landingButton">Iniciar!</button>
          </Link>
        </div>
        <div className="landingImage">
          <img src={image} alt="xd" />
        </div>
      </div>
    </div>
  );
};
