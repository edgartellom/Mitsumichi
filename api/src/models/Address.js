const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING,
        alllowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM,
        values: ["calle", "avenida", "carretera", "pasaje"],
        defaultValue: "calle",
      },
      nombre: {
        type: DataTypes.STRING,
      },
      numero: {
        type: DataTypes.STRING,
      },
      barrio: {
        type: DataTypes.STRING,
      },
      localidad: {
        type: DataTypes.STRING,
      },
      ciudad: {
        type: DataTypes.STRING,
      },
      provincia: {
        type: DataTypes.STRING,
      },
      pais: {
        type: DataTypes.STRING,
      },
      codigoPostal: {
        type: DataTypes.STRING,
      },
      referencia: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
