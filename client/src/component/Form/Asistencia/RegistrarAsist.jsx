import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registrarAsistencia } from "../../redux/actions/Actions";
import QrScanner from "react-qr-scanner";

export const RegistrarAsist = () => {
  const dispatch = useDispatch();
  const [qrData, setQrData] = useState(null);
  const [estudianteRegistrado, setEstudianteRegistrado] = useState(null);
  const [escaneoHabilitado, setEscaneoHabilitado] = useState(true);

  const handleScan = async (data) => {
    if (data && escaneoHabilitado) {
      console.log("QR Code Data:", data);
      setQrData(data);

      // Extract information from the QR code text
      const qrText = data.text;
      const studentInfo = parseStudentInfo(qrText);

      // Check if the extraction was successful
      if (studentInfo) {
        await handleRegistroAsistencia(studentInfo);

        // Deshabilitar el escaneo después de la primera escaneada
        setEscaneoHabilitado(false);

        // Habilitar el escaneo después de 2 segundos
        setTimeout(() => {
          setEscaneoHabilitado(true);
        }, 2000);
      } else {
        console.error("Error extracting student information from QR code.");
      }
    }
  };

  const parseStudentInfo = (qrText) => {
    try {
      // Split the comma-separated string into an array
      const infoArray = qrText.split(",").map((item) => item.trim());
      const studentInfo = {};

      // Populate the object with key-value pairs
      infoArray.forEach((item) => {
        const [key, value] = item.split(":");
        studentInfo[key] = value;
      });

      return studentInfo;
    } catch (error) {
      console.error("Error parsing student information:", error);
      return null;
    }
  };

  const handleRegistroAsistencia = async (studentInfo) => {
    if (studentInfo && studentInfo.Id_matricula) {
      const fecha = new Date().toISOString().split("T")[0];
      const estado = "presente";

      try {
        // Utilize studentInfo to make the POST request for attendance
        await dispatch(
          registrarAsistencia({
            id_estudiante: studentInfo.Id_matricula,
            fecha,
            estado,
          })
        );

        console.log("Asistencia registrada:", {
          id_estudiante: studentInfo.Id_matricula,
          fecha,
          estado,
        });

        // Almacena la información del estudiante registrado en el estado local
        setEstudianteRegistrado(studentInfo);
      } catch (error) {
        // Log the complete error object for further investigation
        console.error("Error al registrar asistencia:", error);

        if (error.response && error.response.status === 404) {
          alert("Estudiante no encontrado.");
        } else {
          // Log the response data to understand the error
          console.error("Response data:", error.response.data);
          alert(
            "Error al registrar asistencia. Por favor, inténtalo de nuevo."
          );
        }
      }
    }
  };

  const handleError = (error) => {
    console.error("Error al escanear QR:", error);
  };

  return (
    <div>
      <QrScanner onScan={handleScan} onError={handleError} />
      {qrData && (
        <div>
          <h2>Datos del Estudiante:</h2>
          {qrData.text.split(",").map((element, index) => (
            <h2 key={index}>{element}</h2>
          ))}
        </div>
      )}
    </div>
  );
};
