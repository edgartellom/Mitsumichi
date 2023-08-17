const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "orderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      precio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      timestamps: false, //no necesito la columna extra donde mustra la fecha de creacion.
    }
  );
};
