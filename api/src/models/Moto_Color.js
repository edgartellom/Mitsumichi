const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "moto_color",
    {
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // defaultValue: () => Math.floor(Math.random() * 5) + 1,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
