const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//const estudiante = require("./estudiante");
//const asistencia = require("./asistencia");
const matricula = require("./matricula");
const codigo_QR = require("./codigo_QR");
const estudiante = require("./estudiante");
const asistencia = require("./asistencia");
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", estudiante);
router.use("/", asistencia);
router.use("/", matricula);
router.use("/", codigo_QR);

module.exports = router;
