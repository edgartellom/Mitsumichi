const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cartItem",
    {
      // Definición de campos del modelo CartDetail
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
      timestamps: false,
    }
  );
};
