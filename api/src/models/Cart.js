const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cart",
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      items: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      precioTotal: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
