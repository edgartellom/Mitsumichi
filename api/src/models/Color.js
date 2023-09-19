const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "color",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      // value: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
    },
    {
      timestamps: false,
    }
  );
};
