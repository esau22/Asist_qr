import React from "react";
import "./Card.css";
import QRCode from "qrcode.react";

export const Card = ({ id_matricula, nombre, apellido, correo, imagen }) => {
  return (
    <div className="card">
      <h3>{id_matricula}</h3>
      <h3>{nombre}</h3>
      <h3>{apellido}</h3>
      <p>{correo}</p>
      <QRCode value={imagen} />
    </div>
  );
};
