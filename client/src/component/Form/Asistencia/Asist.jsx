import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registrarAsistencia,
  mostrarEstudiante,
} from "../../../redux/actions/Actions";
import QrScanner from "react-qr-scanner";

export const Asist = () => {
  const dispatch = useDispatch();
  const [qrData, setQrData] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      setQrData(data);
      await handleRegistroAsistencia(data);
    }
  };

  const handleError = (error) => {
    console.error("Error al escanear QR:", error);
  };

  const handleRegistroAsistencia = async (qrData) => {
    if (qrData) {
      const fecha = new Date().toISOString().split("T")[0];
      const estado = "presente";

      // Obtener los detalles del estudiante usando la acción mostrarEstudiante
      const response = await dispatch(mostrarEstudiante());
      const estudiantes = response.payload; // Ajusta esto según la estructura de tu respuesta

      // Encontrar el estudiante que coincide con los datos del código QR
      const estudianteEncontrado = estudiantes.find(
        (estudiante) =>
          estudiante.nombre === qrData.nombre &&
          estudiante.apellido === qrData.apellido &&
          estudiante.correo === qrData.correo
      );

      if (estudianteEncontrado) {
        // Realizar el POST directamente desde aquí
        await dispatch(
          registrarAsistencia({
            id_estudiante: estudianteEncontrado.id_estudiante,
            fecha,
            estado,
          })
        );

        console.log("Asistencia registrada:", {
          id_estudiante: estudianteEncontrado.id_estudiante,
          fecha,
          estado,
        });
      } else {
        console.log("Estudiante NO encontrado");
      }
    }
  };

  useEffect(() => {
    // Puedes cargar la lista de estudiantes aquí si es necesario
  }, [dispatch]);

  return (
    <div>
      <QrScanner onScan={handleScan} onError={handleError} />
    </div>
  );
};
