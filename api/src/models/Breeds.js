const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "breed",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      weight: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      life_span: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(500),
        defaultValue:
          "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
      },
    },
    {
      // Desactivamso los timestamps.
      //freezeTableName: true,
      timestamps: false,
    }
  );
};
