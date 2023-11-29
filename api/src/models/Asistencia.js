const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "asistencia",
    {
      id_asistencia: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["presente", "ausente", "tardanza"],
      },
    },
    {
      // Desactivamso los timestamps.
      freezeTableName: true,
      timestamps: false,
    }
  );
};
