const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        values: ["admin", "user"],
        defaultValue: "user",
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "suspended"],
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      timestamps: false,
    }
  );
};
