const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "matricula",
    {
      id_matricula: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Opcional: asegura que cada dirección de correo electrónico sea única
        validate: {
          isEmail: true, // Opcional: valida que el valor sea una dirección de correo electrónico válida
        },
      },
    },
    {
      // Desactivamso los timestamps.
      freezeTableName: true,
      timestamps: false,
    }
  );
};
