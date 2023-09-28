const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "tipo",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
