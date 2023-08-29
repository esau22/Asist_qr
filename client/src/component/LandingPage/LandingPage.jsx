import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import image from "../../image/dogs_1.jpg";

export const LandingPage = () => {
  return (
    <div className="landingContainer">
      <div className="landing">
        <div className="landingInfo">
          <span>Bienvenidos</span>
          <h1>DOG APP</h1>
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
