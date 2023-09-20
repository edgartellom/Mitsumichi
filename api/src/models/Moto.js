const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "moto",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      motoModel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      combustible: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // colorDisponible: {
      //   type: DataTypes.ARRAY(DataTypes.STRING),
      //   allowNull: true,
      // },
      fichaTecnica: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // defaultValue: () => Math.floor(Math.random() * 5) + 1,
      },
      //-------------------------------------------------------------
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Por defecto, la moto no está eliminada
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      //-------------------------------------------------------------
    },
    {
      timestamps: false,
    }
  );
};
