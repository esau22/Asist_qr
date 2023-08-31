const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "temperament",
    {
      //no ponemos el id, sequelize lo haca automatico
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Desactivamos las fechas.
      freezeTableName: true,
      timestamps: false,
    }
  );
};
