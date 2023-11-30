const app = require("express").Router();
//const qr = require("qrcode");
const { Asistencia, Estudiante } = require("../db");

app.post("/asistencia", async (req, res) => {
  try {
    const { fecha, estado, id_estudiante } = req.body;

    // Verificar si el estudiante existe
    const estudianteExistente = await Estudiante.findByPk(id_estudiante);

    if (!estudianteExistente) {
      return res.status(404).json({ error: "Estudiante no encontrado." });
    }

    // Crear una nueva entrada de asistencia en la base de datos
    const nuevaAsistencia = await Asistencia.create({
      fecha,
      estado,
      id_estudiante,
    });

    // Enviar una respuesta exitosa
    res.status(201).json({
      success: true,
      message: "Asistencia registrada exitosamente",
      asistencia: nuevaAsistencia,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
});

app.get("/asistencias", async (req, res) => {
  try {
    // Obtener todas las matrículas
    const asistencia = await Asistencia.findAll();

    // Devolver las matrículas como respuesta
    res.status(200).json(asistencia);
  } catch (error) {
    console.error("Error al obtener matrículas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
module.exports = app;
