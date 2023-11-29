const app = require("express").Router();
//const qr = require("qrcode");
const { Codigo_QR, Matricula } = require("../db");

app.get("/codigos", async (req, res) => {
  try {
    // Obtener todos los estudiantes con sus matrículas asociadas
    const codigo = await Codigo_QR.findAll({
      include: Matricula, // Esto carga las matrículas asociadas a cada estudiante
    });

    // Devolver los estudiantes como respuesta
    res.status(200).json(codigo);
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/*app.get("/generar-qr/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Generar el contenido del código QR
    const qrContent = `Estudiante ID: ${id}`;

    // Crear el registro en la tabla CodigoQR o actualizar si ya existe
    let codigoQR = await Codigo_QR.findOne({ where: { id } });

    if (!codigoQR) {
      codigoQR = await Codigo_QR.create({
        id,
        contenido: qrContent,
      });
    } else {
      codigoQR.contenido = qrContent;
      await codigoQR.save();
    }

    // Generar el código QR como una imagen y enviarla como respuesta
    const qrImage = await qr.toBuffer(qrContent, { type: "png" });
    res.type("png").send(qrImage);
  } catch (error) {
    console.error("Error al generar el código QR:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post("/asociar-qr/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Obtener el contenido del código QR
    const qrContent = `Estudiante ID: ${id}`;

    // Crear el registro en la tabla CodigoQR o actualizar si ya existe
    let codigoQR = await Codigo_QR.findOne({ where: { id } });

    if (!codigoQR) {
      codigoQR = await Codigo_QR.create({
        id,
        contenido: qrContent,
      });
    } else {
      codigoQR.contenido = qrContent;
      await codigoQR.save();
    }

    res.status(200).json({ mensaje: "Código QR asociado con éxito" });
  } catch (error) {
    console.error("Error al asociar el código QR:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});*/

module.exports = app;
