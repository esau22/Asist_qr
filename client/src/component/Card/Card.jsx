import React from "react";
import "./Card.css";

export const Card = ({ id, name, temperaments, weight, image }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={image} alt="" />
        <div className="principalContent">
          <h2 className="cardName">{name}</h2>
        </div>
      </div>
      <div className="cardContent">
        <div className="cardItems">
          <h3 className="cardInfo">{weight.join(" - ")} Kg</h3>
          <h3 className="cardInfo">
            {temperaments.join(", ").slice(0, 25)}...
          </h3>
        </div>
      </div>
    </div>
  );
};
