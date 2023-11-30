import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mostrarAsistencia } from "../../redux/actions/Actions";
import "./Detail.css";
export const DetailAsistencia = () => {
  const dispatch = useDispatch();
  // Assuming your state structure has a property 'asistencias' inside 'matricula'
  const { asistencias } = useSelector((state) => state.matricula);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(mostrarAsistencia());
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="attendance-container">
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
        <tbody>
          {asistencias.map((asistencia) => (
            <tr key={asistencia.id_asistencia}>
              <td>{asistencia.id_asistencia}</td>
              <td>{asistencia.fecha}</td>
              <td>{asistencia.estado}</td>
              <td>{asistencia.estudiante.matricula.nombre}</td>
              <td>{asistencia.estudiante.matricula.apellido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
