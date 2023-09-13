const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    items: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    precioTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "completado", "rechazado"),
    },
  });
};
