const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "moto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      motoModelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      kilometraje: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      combustible: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      colorDisponible:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      fichaTecnica: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: () => Math.floor(Math.random() * 5) + 1,
      },
    },
    {
      timestamps: false,
    }
  );
};
