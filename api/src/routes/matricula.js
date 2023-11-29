const app = require("express").Router();
const qr = require("qrcode");
const { Matricula, Estudiante, Codigo_QR } = require("../db");

// Ruta para registrar la matrícula
app.post("/matricula", async (req, res) => {
  try {
    // Obtener los datos de la solicitud
    const { id_matricula, nombre, apellido, correo } = req.body;

    // Verificar si la matrícula ya existe para este estudiante
    const matriculaExistente = await Matricula.findOne({
      where: { nombre, apellido },
    });

    if (matriculaExistente) {
      return res
        .status(400)
        .json({ error: "El estudiante ya tiene una matrícula existente." });
    }

    // Generar un código QR para la nueva matrícula
    const codigoQR = await qr.toDataURL(
      `Id_matricula: ${id_matricula},Nombre: ${nombre}, Apellido: ${apellido}, Correo: ${correo}`
    );

    // Convert the QR code data URL to a buffer
    const qrBuffer = Buffer.from(codigoQR.split(",")[1], "base64");

    // Crear una nueva matrícula en la base de datos
    const nuevaMatricula = await Matricula.create({
      nombre,
      apellido,
      correo,
      imagen: qrBuffer,
    });
    // Crear un nuevo estudiante y asociar con la matrícula
    const nuevoEstudiante = await Estudiante.create({
      nombre,
      apellido,
      correo,
      id_matricula: nuevaMatricula.id_matricula,
    });

    const nuevoCodigo_QR = await Codigo_QR.create({
      id_matricula: nuevaMatricula.id_matricula,
    });

    // Enviar una respuesta exitosa
    res.status(201).json({
      message: "Matrícula registrada exitosamente",
      codigo: nuevoCodigo_QR,
      estudiante: nuevoEstudiante,
      //codigoQR: nuevoCodigoQR,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/matriculas", async (req, res) => {
  try {
    // Obtener todas las matrículas
    const matriculas = await Matricula.findAll();

    // Devolver las matrículas como respuesta
    res.status(200).json(matriculas);
  } catch (error) {
    console.error("Error al obtener matrículas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = app;
