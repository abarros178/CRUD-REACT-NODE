const { DataTypes } = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("profesor", {
    id: {
      type: type.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: type.STRING,
      allowNull: false,
    },
    identificacion: {
      type: type.BIGINT,
      allowNull: false,
    },
    tipo_profesor: {
      type: type.BIGINT,
      allowNull: false,
    },
    username: {
      type: type.STRING,
      allowNull: false,
    },
    gemale: {
      type: type.BIGINT,
      allowNull: false,
    },
    avatarlink: {
      type: type.STRING,
      allowNull: false,
    },
    estado: {
      type: type.STRING,
      allowNull: false,
      defaultValue: "1",
    },
  });
};
