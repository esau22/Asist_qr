import React, { useState, useEffect } from "react";
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

      // Deshabilitar el escaneo temporalmente
      setEscaneoHabilitado(false);

      // Extract information from the QR code text
      const qrText = data.text;
      const studentInfo = parseStudentInfo(qrText);

      // Check if the extraction was successful
      if (studentInfo) {
        try {
          // Utilizar studentInfo para hacer la solicitud POST para la asistencia
          await dispatch(
            registrarAsistencia({
              id_estudiante: studentInfo.Id_matricula,
              fecha: new Date().toISOString().split("T")[0],
              estado: "presente",
            })
          );

          console.log("Asistencia registrada:", {
            id_estudiante: studentInfo.Id_matricula,
            fecha: new Date().toISOString().split("T")[0],
            estado: "presente",
          });

          // Almacenar la información del estudiante registrado en el estado local
          setEstudianteRegistrado(studentInfo);
        } catch (error) {
          console.error("Error al registrar asistencia:", error);

          if (error.response && error.response.status === 404) {
            alert("Estudiante no encontrado.");
          } else {
            console.error("Response data:", error.response.data);
            alert(
              "Error al registrar asistencia. Por favor, inténtalo de nuevo."
            );
          }
        } finally {
          // Habilitar el escaneo después de procesar el escaneo (éxito o error)
          setEscaneoHabilitado(true);
        }
      } else {
        console.error("Error extracting student information from QR code.");

        // En caso de error de extracción, habilitar el escaneo inmediatamente
        setEscaneoHabilitado(true);
      }
    }
  };

  const parseStudentInfo = (qrText) => {
    try {
      const infoArray = qrText.split(",").map((item) => item.trim());
      const studentInfo = {};

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

  const handleError = (error) => {
    console.error("Error al escanear QR:", error);
  };

  useEffect(() => {
    // Limpiar el estado después de que el componente se desmonte
    return () => {
      setQrData(null);
      setEstudianteRegistrado(null);
    };
  }, []);

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
