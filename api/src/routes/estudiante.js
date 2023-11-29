//const axios = require("axios");
const app = require("express").Router();
const { Estudiante, Matricula } = require("../db");

//const esTextoValido = (value) => /^[a-zA-Z\s]+$/.test(value);

app.get("/estudiantes", async (req, res) => {
  try {
    // Obtener todos los estudiantes con sus matrículas asociadas
    const estudiantes = await Estudiante.findAll({
      include: Matricula, // Esto carga las matrículas asociadas a cada estudiante
    });

    // Devolver los estudiantes como respuesta
    res.status(200).json(estudiantes);
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = app;
