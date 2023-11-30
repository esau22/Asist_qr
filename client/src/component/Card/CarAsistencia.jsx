import React from "react";

export const CardAsistencia = ({
  id_asistencia,
  id_estudiante,
  fecha,
  estado,
}) => {
  return (
    <div className="card">
      <h3>{id_estudiante}</h3>
      <h3>{fecha}</h3>
      <h3>{estado}</h3>
    </div>
  );
};
